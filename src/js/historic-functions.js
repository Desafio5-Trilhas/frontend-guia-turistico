const modalHistoric = document.getElementById("modalHistoric");
const btnHistoric = document.getElementById("openHistoricSection");
const spanHistoric = document.getElementById("closeModalHistoric");

btnHistoric.onclick = function() {
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
    


    