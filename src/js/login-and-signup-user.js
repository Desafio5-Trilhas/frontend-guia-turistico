document.addEventListener('DOMContentLoaded', () => {
    /* login functions */
    const modalLogin = document.getElementById("modalLogin");
    const btnLogin = document.getElementById("openModalBtnLogin");
    const spanLogin = document.getElementById("closeModalLogin");
    const btnSignup2 = document.getElementById("openModalBtnSignup2");

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

    // open signup for login option
    btnSignup2.onclick = function() {
        spanLogin.click()
        btnSignup.click()
    }

    let inputsLogin = document.querySelectorAll(`.input-container-login input`)
    inputsLogin.forEach(input => {
        input.addEventListener("keypress", function(e) {
            removeErrorInputsLogin()
        });
    })

    function setErrorInputsLogin() {
        let inputsLogin = document.querySelectorAll(`.input-container-login input`)
        inputsLogin.forEach(input => {
            input.classList.add('form-error')
        })

        let inputsErrorIconLogin = document.querySelectorAll('.input-container-login .error-icon-login')
        inputsErrorIconLogin.forEach(input => {
            input.style.display = 'flex'
            if(input.parentNode.querySelector('.input-title').classList.contains('focused')) {
                input.style.top = "62%";
            }else {
                input.style.top = "";
            }
        })

        document.getElementById('errorMsg').innerHTML = 'Email ou senha incorretos.'
    }

    function removeErrorInputsLogin() {
        let inputsContainerLogin = document.querySelectorAll('.input-container-login input')
        inputsContainerLogin.forEach(input => {
            input.classList.remove('form-error')
            input.classList.remove('form-save')
        })

        let inputsErrorIconLogin = document.querySelectorAll('.input-container-login .error-icon-login')
        inputsErrorIconLogin.forEach(input => {
            input.style.display = 'none'
        })

        let inputsSaveIconLogin = document.querySelectorAll('.input-container-login .save-icon-login')
        inputsSaveIconLogin.forEach(input => {
            input.style.display = 'none'
        })

        document.getElementById('errorMsg').innerHTML = ''

    }

    function setCorrectInputsLogin() {
        let inputsContainerLogin = document.querySelectorAll('.input-container-login input')
        inputsContainerLogin.forEach(input => {
            input.classList.add('form-save')
        })

        let inputsSaveIconLogin = document.querySelectorAll('.input-container-login .save-icon-login')
        inputsSaveIconLogin.forEach(input => {
            input.style.display = 'flex'
        })

    }

    const loginForm = document.getElementById('loginForm')
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(loginForm);

       const email = formData.get('email');
       const password = formData.get('password');
        
       removeErrorInputsLogin()
       const url = 'https://api-guia-turistico.vercel.app/api/usuario/login';
       const apiKey = 'T69ve4cPJD4rK23mEpx40LXlwhDf7Y6grwpIL03yMtX2XgiuaZp1C6HkQvgsJUu1';
       if(email == '' || password == '') {
        setErrorInputsLogin()
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
                setErrorInputsLogin()
            }else {
                removeErrorInputsLogin()
                setCorrectInputsLogin()
                localStorage.setItem('authToken', data['acess_token']);
                setTimeout(function(){ 
                    spanLogin.click()
                    document.querySelector('#openModalBtnEditUser').innerHTML = 'Perfil'
                    document.querySelector('#openModalBtnEditUser').parentNode.style.display = ''
                    document.querySelector('#openModalBtnLogin').parentNode.style.display = 'none'
                    document.querySelector('#openModalBtnSignup').parentNode.style.display = 'none'
                    document.querySelector('#openHistoricSection').parentNode.style.display = ''
                    document.querySelector('#openMissionConcludedSection').parentNode.style.display = ''
                }, 1000);

            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        }); 
    });


    /* signup functions */

    const btnSignup = document.getElementById("openModalBtnSignup");
    const modalSignup = document.getElementById("modalSignup");
    const spanSignup = document.getElementById("closeModalSignup");

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

    let inputsSignup = document.querySelectorAll(`.input-container-signup input`)
    inputsSignup.forEach(input => {
        input.addEventListener("keypress", function(e) {
            removeErrorInputsSignup()
        });
    })

    function removeErrorInputsSignup() {
        let inputsContainerSignup = document.querySelectorAll('.input-container-signup input')
        inputsContainerSignup.forEach(input => {
            input.classList.remove('form-error')
            input.classList.remove('form-save')
        })

        let inputsErrorIconSignup = document.querySelectorAll('.input-container-signup .error-icon-login')
        inputsErrorIconSignup.forEach(input => {
            input.style.display = 'none'
        })

        let inputsSaveIconSignup = document.querySelectorAll('.input-container-signup .save-icon-login')
        inputsSaveIconSignup.forEach(input => {
            input.style.display = 'none'
        })
        document.getElementById('errorMsgName').innerHTML = '';
        document.getElementById('errorMsgEmail').innerHTML = '';
        document.getElementById('errorMsgCPF').innerHTML = '';
        document.getElementById('errorMsgPassword').innerHTML = '';
        document.getElementById('errorMsgConfirmPassword').innerHTML = '';

    }

    function setCorrectInputsSignup() {
        let inputsContainerSignup = document.querySelectorAll('.input-container-signup input')
        inputsContainerSignup.forEach(input => {
            input.classList.add('form-save')
        })

        let inputsSaveIconSignup= document.querySelectorAll('.input-container-signup .save-icon-login')
        inputsSaveIconSignup.forEach(input => {
            input.style.display = 'flex'
        })

    }

    function addErrorFieldSignup(inputSignup, InputErrorIconSignup) {
        inputSignup.classList.add('form-error')
        InputErrorIconSignup.style.display = 'flex'
        if(inputSignup.parentNode.querySelector('.input-title').classList.contains('focused')) {
            InputErrorIconSignup.style.top = "62%";
        }else {
            InputErrorIconSignup.style.top = "";
        }
    }
    function checkFieldsError(name, cpf, email, password, confirmPassword) {
        let error = false
        let inputsSignup = document.querySelectorAll('.input-container-signup input')
        let inputsErrorIconSignup = document.querySelectorAll('.input-container-signup .error-icon-login')

        if(name == '') {
            error = true
            addErrorFieldSignup(inputsSignup[0], inputsErrorIconSignup[0])
            document.getElementById('errorMsgName').innerHTML = 'Campo não pode ser vazio.';
        }
        if(email == '') {
            error = true
            addErrorFieldSignup(inputsSignup[1], inputsErrorIconSignup[1])
            document.getElementById('errorMsgEmail').innerHTML = 'Campo não pode ser vazio.';
        }
        if(cpf == '') {
            error = true
            addErrorFieldSignup(inputsSignup[2], inputsErrorIconSignup[2])
            document.getElementById('errorMsgCPF').innerHTML = 'Campo não pode ser vazio.';
        }
        if(password == '') {
            error = true
            addErrorFieldSignup(inputsSignup[3], inputsErrorIconSignup[3])
            document.getElementById('errorMsgPassword').innerHTML = 'Campo não pode ser vazio.';
        }
        if(confirmPassword == '') {
            error = true
            addErrorFieldSignup(inputsSignup[4], inputsErrorIconSignup[4])
            document.getElementById('errorMsgConfirmPassword').innerHTML = 'Campo não pode ser vazio.';
        } 
        if(confirmPassword != password) {
            error = true
            addErrorFieldSignup(inputsSignup[4], inputsErrorIconSignup[4])
            document.getElementById('errorMsgConfirmPassword').innerHTML = 'As senhas não coincidem.';
        }

        return error
    }

    function checkFieldsErrorBackend(error) {
        let inputsSignup = document.querySelectorAll('.input-container-signup input')
        let inputsErrorIconSignup = document.querySelectorAll('.input-container-signup .error-icon-login')

        if(error['nome']) {
            addErrorFieldSignup(inputsSignup[0], inputsErrorIconSignup[0])
            document.getElementById('errorMsgName').innerHTML = error['nome'];
        }
        if(error['email']) {
            addErrorFieldSignup(inputsSignup[1], inputsErrorIconSignup[1])
            document.getElementById('errorMsgEmail').innerHTML = error['email'];
        }
        if(error['documenter']) {
            addErrorFieldSignup(inputsSignup[2], inputsErrorIconSignup[2])
            document.getElementById('errorMsgCPF').innerHTML = error['documenter'];
        }
        if(error['senha']) {
            addErrorFieldSignup(inputsSignup[3], inputsErrorIconSignup[3])
            document.getElementById('errorMsgPassword').innerHTML = error['senha'];
        }

    }

    const signupForm = document.getElementById('signupForm')
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(signupForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const cpf = formData.get('cpf');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        
       removeErrorInputsSignup()

       let checkError = checkFieldsError(name, cpf, email, password, confirmPassword)
       if(checkError) {
            return 
       }

       const url = 'https://api-guia-turistico.vercel.app/api/usuario/signup';
       const apiKey = 'T69ve4cPJD4rK23mEpx40LXlwhDf7Y6grwpIL03yMtX2XgiuaZp1C6HkQvgsJUu1';
      
       fetch(url, {  
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({
                nome: name,
                email: email,
                senha: password,
                documento: cpf
            })
        }) 
        .then(response => {
            return response.json();
        })
        .then(data => {
            if(!data['errors'] && data['status'] != '422') {
                setCorrectInputsSignup()
                setTimeout(function(){ 
                    spanSignup.click()
                }, 1000);
            }else {
                if(data['status'] == '422') {
                    let inputsSignup = document.querySelectorAll('.input-container-signup input')
                    let inputsErrorIconSignup = document.querySelectorAll('.input-container-signup .error-icon-login')
            
                    addErrorFieldSignup(inputsSignup[1], inputsErrorIconSignup[1])
                    document.getElementById('errorMsgEmail').innerHTML = data['message'];
                    return 
                }

                for(i = 0; i < data['errors'].length; i++) {
                    checkFieldsErrorBackend(data['errors'][i])
                }
                
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


    