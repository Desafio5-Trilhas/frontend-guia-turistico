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
    document.querySelector(`#email-container input`).addEventListener("keypress", function(e) {
        removeErrorInputs()
    });

    document.querySelector(`#password-container input`).addEventListener("keypress", function(e) {
        removeErrorInputs()
    });

    function setErrorInputs() {
        document.querySelector(`#email-container input`).classList.add('form-error')
        document.querySelector(`#password-container input`).classList.add('form-error')
        document.querySelector(`#email-container .error-icon-login`).style.display = 'flex'
        document.querySelector(`#password-container .error-icon-login`).style.display = 'flex'
        if(document.querySelector(`#email-container .input-title`).classList.contains('focused')) {
            document.querySelector(`#email-container .error-icon-login`).style.top = "62%";
        }else {
            document.querySelector(`#email-container .error-icon-login`).style.top = "";
        }
        if(document.querySelector(`#password-container .input-title`).classList.contains('focused')) {
            document.querySelector(`#password-container .error-icon-login`).style.top = "62%";
        }else {
            document.querySelector(`#password-container .error-icon-login`).style.top = "";
        }

        document.getElementById('errorMsg').innerHTML = 'Email ou senha incorretos.'
    }

    function removeErrorInputs() {
        document.querySelector(`#email-container input`).classList.remove('form-error')
        document.querySelector(`#password-container input`).classList.remove('form-error')
        document.querySelector(`#email-container .error-icon-login`).style.display = 'none'
        document.querySelector(`#password-container .error-icon-login`).style.display = 'none'
        document.querySelector(`#email-container input`).classList.remove('form-save')
        document.querySelector(`#password-container input`).classList.remove('form-save')
        document.querySelector(`#email-container .save-icon-login`).style.display = 'none'
        document.querySelector(`#password-container .save-icon-login`).style.display = 'none'
        document.getElementById('errorMsg').innerHTML = ''
    }

    function setCorrectInputs() {
        document.querySelector(`#email-container input`).classList.add('form-save')
        document.querySelector(`#password-container input`).classList.add('form-save')
        document.querySelector(`#email-container .save-icon-login`).style.display = 'flex'
        document.querySelector(`#password-container .save-icon-login`).style.display = 'flex'
    }

    const loginForm = document.getElementById('loginForm')
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(loginForm);

       const email = formData.get('email');
       const password = formData.get('password');
        
       console.log(email, password)
       removeErrorInputs()
       const url = 'https://api-guia-turistico.vercel.app/api/usuario/login';
       const apiKey = 'T69ve4cPJD4rK23mEpx40LXlwhDf7Y6grwpIL03yMtX2XgiuaZp1C6HkQvgsJUu1';
       if(email == '' || password == '') {
          setErrorInputs()
          return 
       }
       fetch(url, {  
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({
                email: email,
                senha: password
            })
        }) 
        .then(response => {
            return response.json();
        })
        .then(data => {
            if(data['status'] == '404') {
                setErrorInputs()
            }else {
                removeErrorInputs()
                setCorrectInputs()
                localStorage.setItem('authToken', data['acess_token']);
                setTimeout(function(){ 
                    spanLogin.click()
                    document.querySelector('#openModalBtnEditUser').innerHTML = 'Perfil'
                    document.querySelector('#openModalBtnEditUser').parentNode.style.display = ''
                    document.querySelector('#openModalBtnLogin').parentNode.style.display = 'none'
                    document.querySelector('#openModalBtnSignup').parentNode.style.display = 'none'
                }, 1000);

            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        }); 
    });

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
        }else if(event.target == document.getElementById("modalHistoric")) {
            const modalContent = document.getElementById("modalHistoric").querySelector('.modal-content-historic');
            modalContent.classList.add('slide-down-exit');
            setTimeout(() => {
                document.getElementById("modalHistoric").classList.remove('show');
            }, 300);
        }else if(event.target == document.getElementById("modalMissionConcluded")) {
            const modalContent = document.getElementById("modalMissionConcluded").querySelector('.modal-content-mission');
            modalContent.classList.add('slide-down-exit');
            setTimeout(() => {
                document.getElementById("modalMissionConcluded").classList.remove('show');
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


    