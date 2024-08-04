const modalMissionConcluded = document.getElementById("modalMissionConcluded");
const btnMissionConcluded = document.getElementById("openMissionConcludedSection");
const spanMissionConcluded = document.getElementById("closeModalMissionConcluded");

btnMissionConcluded.onclick = function() {
    modalMissionConcluded.classList.add('show');
    const modalContent = modalMissionConcluded.querySelector('.modal-content-mission');
    modalContent.classList.remove('slide-down-exit');
    modalContent.classList.add('slide-down-enter');
}

spanMissionConcluded.onclick = function() {
    const modalContent = modalMissionConcluded.querySelector('.modal-content-mission');
    modalContent.classList.add('slide-down-exit');
    setTimeout(() => {
        modalMissionConcluded.classList.remove('show');
    }, 300);
}
    


    