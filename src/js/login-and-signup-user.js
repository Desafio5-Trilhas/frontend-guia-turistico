document.addEventListener('DOMContentLoaded', () => {
    const modalLogin = document.getElementById("modalLogin");
    const btnLogin = document.getElementById("openModalBtnLogin");
    const btnSignup = document.getElementById("openModalBtnSignup");
    const modalSignup = document.getElementById("modalSignup");
    const spanLogin = document.getElementById("closeModalLogin");
    const spanSignup = document.getElementById("closeModalSignup");
    
    btnLogin.onclick = function() {
        modalLogin.classList.add('show');
        const modalContent = modalLogin.querySelector('.modal-content');
        modalContent.classList.remove('slide-down-exit');
        modalContent.classList.add('slide-down-enter');
    }

    spanLogin.onclick = function() {
        const modalContent = modalLogin.querySelector('.modal-content');
        modalContent.classList.add('slide-down-exit');
        setTimeout(() => {
            modalLogin.classList.remove('show');
        }, 300);
    }

    btnSignup.onclick = function() {
        modalSignup.classList.add('show');
        const modalContent = modalSignup.querySelector('.modal-content');
        modalContent.classList.remove('slide-down-exit');
        modalContent.classList.add('slide-down-enter');
    }

    spanSignup.onclick = function() {
        const modalContent = modalSignup.querySelector('.modal-content');
        modalContent.classList.add('slide-down-exit');
        setTimeout(() => {
            modalSignup.classList.remove('show');
        }, 300);
    }

    window.onclick = function(event) {
        if (event.target === modalSignup) {
            const modalContent = modalSignup.querySelector('.modal-content');
            modalContent.classList.add('slide-down-exit');
            setTimeout(() => {
                modalSignup.classList.remove('show');
            }, 300);
        }else if(event.target === modalLogin) {
            const modalContent = modalLogin.querySelector('.modal-content');
            modalContent.classList.add('slide-down-exit');
            setTimeout(() => {
                modalLogin.classList.remove('show');
            }, 300);
        }
    }

    let inputsModal = document.querySelectorAll('.input-style-2')
    inputsModal.forEach(inputField => {
        inputField.addEventListener('focus', (event) => {
            let inputTitle = event.target.parentNode.querySelector('span')
            console.log(inputTitle)
            inputTitle.classList.add('focused');
        });
        inputField.addEventListener('blur', (event) => {
            let inputTitle = event.target.parentNode.querySelector('span')
            if(inputField.value.length == 0) {
                inputTitle.classList.remove('focused');
            }
        });

    });
});


    