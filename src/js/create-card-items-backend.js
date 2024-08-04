let jsonData;
const apiKey = 'T69ve4cPJD4rK23mEpx40LXlwhDf7Y6grwpIL03yMtX2XgiuaZp1C6HkQvgsJUu1';
const options = {
    method: 'GET', 
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
    }
};

function fetchItemsIndexDefault() {
    const url = 'https://api-guia-turistico.vercel.app/api/destino'
  
    return fetch(url, options) 
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data; 
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function createCardItems() {
  let html = "";

  fetchItemsIndexDefault().then(data => {
    jsonData = data
    const items = Object.values(data);

    // construct items carrousel
    let carouselContainer = document.querySelector('.swiper-wrapper')
    items.forEach((item) => {
        html += `<div class="swiper-slide" id="card-item-${item.id_destino}">
            <img src="${item.imagems[0].imagem}" width="150" height="180" alt="">
            <span class="text-overlay">${item.titulo}</span>
        </div>`;
    });
    carouselContainer.innerHTML = html

    addClickEventToCardItem()
    


  });
  
}
function closeInfoDetails(el) {
  var tourDetails = document.getElementById('tour-details');
  
  tourDetails.classList.remove('raised');
  tourDetails.classList.add('closing');
  
  setTimeout(function() {
      tourDetails.style.display = 'none';
      tourDetails.classList.remove('closing');
      carousel.style.display = '';
  }, 500); 
}


function fetchInfoBackend(destineID) {
    const url = 'https://api-guia-turistico.vercel.app/api/destino/'+destineID
  
    return fetch(url, options) 
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data; 
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}
function fetchInfoDetails(item) {
    let html = "";
    let destineID = item.id.replace('card-item-', '')

    fetchInfoBackend(destineID).then(data => {
        const itemCard = jsonData.filter(item => item.id_destino == destineID)[0];
        document.getElementById('idPointInfo').innerHTML = itemCard.titulo

        let imagesContainer = document.querySelector('.images-container')

        itemCard.imagems.forEach((item) => {
        html += `<div class="img-slide-${item.id_imagem}">
                <img src="${item.imagem}" width="300" height="150" alt="">
                </div>`;
        });
        imagesContainer.innerHTML = html

        let select = document.getElementById('id-points-of-interest')
        let optionHtml = "";

        data.rotas.forEach((item) => {
            optionHtml += `<option value="${item.id_rota}" data-latitude="${item.latitude}" data-longitude="${item.longitude}">${item.nome}</option>`;
        });
        select.innerHTML = optionHtml

        document.querySelector('.image-google-maps').innerHTML = `
            <img src="./assets/images/image-maps01.png" width="auto" height="600" alt="">      
        `

        checkMissionDaily(data)

    })
    

}

async function getMissionConcluded() {
    const url = 'https://api-guia-turistico.vercel.app/api/missao-concluida/';
    const apiKey = 'T69ve4cPJD4rK23mEpx40LXlwhDf7Y6grwpIL03yMtX2XgiuaZp1C6HkQvgsJUu1';
    
    try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}
async function checkMissionDaily(itemData){
    let htmlMission = "";
    let missionContainer = document.querySelector('.mission-daily-container')
    
    if(!localStorage.getItem('authToken')) {
      htmlMission = `
        <span class="title-secondary" id="mission-daily-title">
          Infelizmente essa opção so esta disponivel para os usuarios 
          cadastrados no sistema.
        </span>
        <div>
          <img src="./assets/images/image-default-mission01.png" width="150" height="150"alt="">
        </div>
      `
      missionContainer.innerHTML = htmlMission;

      return 
    }
    
    let missionConcluded = await getMissionConcluded()
    if(missionConcluded.length > 0) {
      // Função para remover elementos do arrayA se id_missao existir em arrayB
      function removeIfExists(itemDatas, missionConcluded) {
        return itemDatas.filter(itemA => {
            return !missionConcluded.some(itemB => itemA.id_missao === itemB.id_missao);
        });
      }

      itemData.missaos = removeIfExists(itemData.missaos, missionConcluded);
    }

    if(itemData.missaos.length > 0) {

      itemData.missaos.forEach((item) => {
        htmlMission += `
          <div class="mission-tip">
            <span class="title-tip" id="mission-${item.id_missao}">${item.dica1}?</span>
            <div id="tip-answer-${item.id_destino}" style="position: relative; width: 45%">
              <input type="text" class="input-style-1">
              <span class="error-icon">
                <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512">
                  <path fill="#dc3545" d="M504 256c0 137-111 248-248 248S8 393 8 256C8 119.1 119 8 256 8s248 111.1 248 248zm-248 50c-25.4 0-46 20.6-46 46s20.6 46 46 46 46-20.6 46-46-20.6-46-46-46zm-43.7-165.3l7.4 136c.3 6.4 5.6 11.3 12 11.3h48.5c6.4 0 11.6-5 12-11.3l7.4-136c.4-6.9-5.1-12.7-12-12.7h-63.4c-6.9 0-12.4 5.8-12 12.7z"/>
                </svg>
              </span>
            </div>
          </div>
        `;
      });
      htmlMission += `
        <button class="submitButtonTipStyle" onclick="submitMissionDaily(${itemData.missaos[0].id_destino});">
          Salvar
        </button>

      `
      missionContainer.innerHTML = htmlMission;

      return 
    }else {
      htmlMission = `
        <span class="title-secondary" id="mission-daily-title">
          Você ja concluiu todas as missões deste destino.
        </span>
        <div>
          <img src="./assets/images/image-default-mission01.png" width="150" height="150"alt="">
        </div>
      `
      missionContainer.innerHTML = htmlMission;

      return 

    }

}

function addClickEventToCardItem() {
    var carouselItems = document.querySelectorAll('.swiper-slide');
    var carousel = document.getElementById('carousel');
    
    carouselItems.forEach(function(item) {
        item.addEventListener('click', function() {
          fetchInfoDetails(item)
          //se logado salvar historico
          if(localStorage.getItem('authToken')) {
            createHistoricBackend(item)
          }

          setTimeout(function() {
            carousel.style.display = 'none';
            var tourDetails = document.getElementById('tour-details');
            tourDetails.style.display = '';
            tourDetails.classList.toggle('raised');
          }, 400); 

        });
    });
}

createCardItems()