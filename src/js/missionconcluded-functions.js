const modalMissionConcluded = document.getElementById("modalMissionConcluded");
const btnMissionConcluded = document.getElementById("openMissionConcludedSection");
const spanMissionConcluded = document.getElementById("closeModalMissionConcluded");

btnMissionConcluded.onclick = function() {
    fetchMissionConcludedModal()
    setTimeout(function() {
        modalMissionConcluded.classList.add('show');
        const modalContent = modalMissionConcluded.querySelector('.modal-content-mission');
        modalContent.classList.remove('slide-down-exit');
        modalContent.classList.add('slide-down-enter');
    }, 400); 
  
}

spanMissionConcluded.onclick = function() {
    const modalContent = modalMissionConcluded.querySelector('.modal-content-mission');
    modalContent.classList.add('slide-down-exit');
    setTimeout(() => {
        modalMissionConcluded.classList.remove('show');
    }, 300);
}

function getDataFormatedToShow(data) {
    const date = new Date(data);

    const getMonthName = (monthIndex) => {
        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        return months[monthIndex];
    };

    const day = date.getDate();
    const month = date.getMonth(); 
    const year = date.getFullYear();

    const formattedDate = `${day}, de ${getMonthName(month)} de ${year}`;
    return formattedDate

}
function fetchMissionConcludedModal() {
    const url = 'https://api-guia-turistico.vercel.app/api/missao-concluida/';
    const apiKey = 'T69ve4cPJD4rK23mEpx40LXlwhDf7Y6grwpIL03yMtX2XgiuaZp1C6HkQvgsJUu1';
    
    fetch(url, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'Authorization': `Bearer ${localStorage.getItem('authToken')}` 
        },
      }) 
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let html = "";
            console.log(data, 'here123')
            getDataFormatedToShow(data[0].data_finalizacao)
            document.querySelector('.modal-form-imgs').innerHTML = ''
            let missionConcludedContainer = document.querySelector('.modal-form-imgs')

            if(data.length > 0) {                
                data.forEach((item) => {
                    html += `<div class="img-mission-icon">
                        <div>
                            <img src="../assets/images/image-points.png" width="100px" height="100px" alt="">
                        </div>            
                        <div class="title-mission-img">${item.ultima_dica}</div>
                        <div class="data-mission-img"> ${getDataFormatedToShow(item.data_finalizacao)}</div>
                    </div>`
                });
                missionConcludedContainer.innerHTML = html
                
            }else {
                console.error('Não existem missões concluidas ainda para esse usuario.')
                missionConcludedContainer.innerHTML = `<h2> Não missões concluidas ainda para esse usuario</h2>`
            
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}
    
    


    