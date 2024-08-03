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

function processImage(image) {
    console.log(image)
    // Converte o array de bytes em um Uint8Array
    const byteArray = new Uint8Array(image.data);

    // Cria um Blob a partir do Uint8Array
    const blob = new Blob([byteArray], { type: 'image/jpeg' }); // ou 'image/png' dependendo do tipo de imagem

    // Cria uma URL para o Blob
    const imageUrl = URL.createObjectURL(blob);

    // Define o src do elemento img para a URL do Blob
    console.log(imageUrl)
    return imageUrl;
                   
}

function createCardItems() {
  let html = "";

  fetchItemsIndexDefault().then(data => {
    console.log(data)
    const items = Object.values(data);
    console.log(items[0])

    // construct items carrousel
    let carouselContainer = document.querySelector('.swiper-wrapper')
    items.forEach((item, index) => {
        if(index != 3) {
            html += `<div class="swiper-slide" id="card-item-${item.id_destino}">
                <img src="${processImage(item.imagems[0].imagem)}" width="150" height="180" alt="">
                <span class="text-overlay">${item.titulo}</span>
            </div>`;
        }
        // html += `<div class="swiper-slide" id="card-item-${item.id_destino}">
        //     <img src="${processImage(item.imagems[0].imagem)}" width="150" height="180" alt="">
        //     <span class="text-overlay">${item.titulo}</span>
        // </div>`;
    });
    carouselContainer.innerHTML = html

  });
  
}

createCardItems()