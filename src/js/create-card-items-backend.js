let jsonData = [];
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
            jsonData = data;
            return data; 
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function fetchItemsInfoDefault(index) {
    const url = 'https://api-guia-turistico.vercel.app/api/destino/'+index
    
    return fetch(url, options) 
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            jsonData = data;
            return data; 
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function createCardItems() {
  let html = "";

  fetchItemsIndexDefault().then(data => {
    const items = Object.values(data);
    //console.log('jsonData:', items[0]);
    items.forEach(item => {
        setTimeout(() => {
            console.log("Delayed for 1 second.");
            fetchItemsInfoDefault(item.id_destino).then(dataInfo => {
                console.log(dataInfo)
                return 
    
                // construct items carrousel
                let carouselContainer = document.querySelector('.swiper-wrapper')
                // Convert the object values to an array
                //   console.log(items);
                items.forEach((item,  index) => {
                    html += `<div class="swiper-slide" id="card-item-${index}">
                        <img src="${item.cardImagePrincipalSrc}" width="150" height="180" alt="">
                        <span class="text-overlay">${item.cardItemName}</span>
                    </div>`;
                });
                carouselContainer.innerHTML = html
            })
        }, "2000");

    }) 

  });
  
}

createCardItems()