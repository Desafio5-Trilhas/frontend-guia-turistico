const modalHistoric = document.getElementById("modalHistoric");
const btnHistoric = document.getElementById("openHistoricSection");
const spanHistoric = document.getElementById("closeModalHistoric");

btnHistoric.onclick = function() {
    fetchHistoricTable()

    modalHistoric.classList.add('show');
    const modalContent = modalHistoric.querySelector('.modal-content-historic');
    modalContent.classList.remove('slide-down-exit');
    modalContent.classList.add('slide-down-enter');
}

spanHistoric.onclick = function() {
    const modalContent = modalHistoric.querySelector('.modal-content-historic');
    modalContent.classList.add('slide-down-exit');
    setTimeout(() => {
        modalHistoric.classList.remove('show');
    }, 300);
}

function getDataAndHourFormated(){
    const now = new Date();
    const formattedDate = now.toLocaleString('pt-BR', { // Formato Brasileiro
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    });
    return String(formattedDate)
}
function createHistoricBackend(item) {
    const url = 'https://api-guia-turistico.vercel.app/api/acesso-historico';
    const apiKey = 'T69ve4cPJD4rK23mEpx40LXlwhDf7Y6grwpIL03yMtX2XgiuaZp1C6HkQvgsJUu1';
    
    fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'Authorization': `Bearer ${localStorage.getItem('authToken')}` 
        },
        body: JSON.stringify({
            id_destino: parseInt(item.id.replace('card-item-', ''), 10),
            data_acesso: getDataAndHourFormated(),
        })
      }) 
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // console.log(data)
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function fetchHistoricTable() {
    const url = 'https://api-guia-turistico.vercel.app/api/acesso-historico';
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
            document.querySelector('#historicTable tbody').innerHTML = ''
            let tbodyContainer = document.querySelector('#historicTable tbody')

            if(data.length > 0) {                
                data.forEach((item, index) => {
                    html += `<tr>
                                <td>${index}</td>
                                <td>${getDataFormatedToShow(item.data_acesso)}</td>
                                <td>${item.destino.titulo}</td>
                             </tr>`
                });
                tbodyContainer.innerHTML = html
                
            }else {
                console.error('Não existe ainda um historico para esse usuario.')
                tbodyContainer.innerHTML = `<h2> Não existe ainda um historico para esse usuario</h2>`
            
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}
    


    