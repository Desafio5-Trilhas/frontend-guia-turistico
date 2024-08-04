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

function toBase64(arr) {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
       arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
 }

function processImage(image) {
    const blob = new Blob([image.data], { type: 'image/jpeg' });

    // Cria um objeto URL a partir do Blob
    const imageUrl = URL.createObjectURL(blob);
    const img = new Image();
    img.src = imageUrl;
    console.log(imageUrl)
    img.onload = function() {
        // Cria um elemento canvas
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        // Desenha a imagem no canvas
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Converte o canvas em uma data URL
        const dataUrl = canvas.toDataURL('image/jpg');
        
        // Cria uma nova imagem com a data URL
        const newImg = document.createElement('img');
        newImg.src = dataUrl;
        console.log(newImg);
    };
                   
}

function createCardItems() {
  let html = "";

  fetchItemsIndexDefault().then(data => {
    console.log(data)
    const items = Object.values(data);
    console.log(items[0].imagems[2])
    processImage(items[0].imagems[2].imagem)

    return 

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