  let jsonData = [];

  function fetchItemsDefault() {
    return fetch('./js/card-items-example.json') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            jsonData = data;
            return jsonData; 
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
  }

  function createCardItems() {
    let html = "";
    fetchItemsDefault().then(data => {
      let carouselContainer = document.querySelector('.swiper-wrapper')
      // Convert the object values to an array
      const items = Object.values(jsonData);
      items.forEach((item,  index) => {
          html += `<div class="swiper-slide" id="card-item-${index}">
              <img src="${item.cardImagePrincipalSrc}" width="150" height="180" alt="">
              <span class="text-overlay">${item.cardItemName}</span>
          </div>`;
      });
      carouselContainer.innerHTML = html

    });
    
  }
  
  createCardItems()