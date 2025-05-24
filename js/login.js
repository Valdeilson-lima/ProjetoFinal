document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const successMessage = document.getElementById('successMessage');
    const generalLoginError = document.getElementById('generalLoginError');

    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
    }

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault(); 

        clearMessages();

        let isValid = true; 
        const minPasswordLength = 6; 

        if (!validateEmail(emailInput.value)) {
            displayError(emailError, 'Por favor, insira um e-mail válido.', emailInput);
            isValid = false;
        }

        if (!validatePassword(passwordInput.value, minPasswordLength)) {
            displayError(passwordError, `A senha deve ter pelo menos ${minPasswordLength} caracteres.`, passwordInput);
            isValid = false;
        }

        if (isValid) {
            const submitButton = loginForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Entrando...';

            try {
                const loginSuccessful = await performLogin(emailInput.value, passwordInput.value);

                if (loginSuccessful) {
                    localStorage.setItem('userEmail', emailInput.value); 
                    localStorage.setItem('isLoggedIn', 'true');
                    
                    displaySuccess('Login realizado com sucesso! Redirecionando...');
                    setTimeout(() => {
                        console.log("Redirecionando para o dashboard...");
                        window.location.href = 'pages/cadastroProduto.html'; 
                    }, 2000);

                } else {
                    displayError(generalLoginError, 'E-mail ou senha incorretos.', null);
                }
            } catch (error) {
                console.error('Erro ao tentar realizar login:', error);
                displayError(generalLoginError, 'Ocorreu um erro ao tentar fazer login. Tente novamente.', null);
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Entrar';
            }
        }
    });

    async function performLogin(email, password) {
        console.log(`Tentando login com E-mail: ${email} e Senha: ${password}`);
        
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

        const userFound = registeredUsers.find(user => user.email === email && user.password === password);

        if (userFound) {
            console.log('Login bem-sucedido.');
            return true;
        } else {
            console.log('Login falhou: E-mail ou senha incorretos.');
            return false;
        }
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePassword(password, minLength) {
        return password.length >= minLength;
    }

    function displayError(element, message, inputField) {
        element.textContent = message;
        if (inputField) {
            inputField.classList.add('invalid');
        }
        element.style.display = 'block';
    }

    function displaySuccess(message) {
        successMessage.textContent = message;
        successMessage.style.display = 'block';
    }

    function clearMessages() {
        emailError.textContent = '';
        passwordError.textContent = '';
        successMessage.textContent = '';
        generalLoginError.textContent = ''; 
        successMessage.style.display = 'none';
        generalLoginError.style.display = 'none';

        emailInput.classList.remove('invalid');
        passwordInput.classList.remove('invalid');
    }

    emailInput.addEventListener('input', function() {
        clearMessages();
        if (emailInput.value.length > 0 && !validateEmail(emailInput.value)) {
            displayError(emailError, 'Formato de e-mail inválido.', emailInput);
        } else {
            emailError.textContent = '';
            emailInput.classList.remove('invalid');
        }
    });

    passwordInput.addEventListener('input', function() {
        clearMessages();
        if (passwordInput.value.length > 0 && !validatePassword(passwordInput.value, minPasswordLength)) {
            displayError(passwordError, `A senha precisa ter pelo menos ${minPasswordLength} caracteres.`, passwordInput);
        } else {
            passwordError.textContent = '';
            passwordInput.classList.remove('invalid');
        }
    });
});