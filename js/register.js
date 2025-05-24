document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const emailInput = document.getElementById('registerEmail');
    const passwordInput = document.getElementById('registerPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const emailError = document.getElementById('registerEmailError');
    const passwordError = document.getElementById('registerPasswordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const successMessage = document.getElementById('registerSuccessMessage');
    const generalError = document.getElementById('registerGeneralError');

  
    let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault(); 

        clearMessages();

        let isValid = true; 
        const minPasswordLength = 6; 

        // Validação de E-mail
        if (!validateEmail(emailInput.value)) {
            displayError(emailError, 'Por favor, insira um e-mail válido.');
            isValid = false;
        } else if (isEmailRegistered(emailInput.value)) { 
            displayError(emailError, 'Este e-mail já está cadastrado.');
            isValid = false;
        }

        // Validação de Senha
        if (!validatePassword(passwordInput.value, minPasswordLength)) {
            displayError(passwordError, `A senha deve ter pelo menos ${minPasswordLength} caracteres.`);
            isValid = false;
        }

        // Validação de Confirmação de Senha
        if (passwordInput.value !== confirmPasswordInput.value) {
            displayError(confirmPasswordError, 'As senhas não coincidem.');
            isValid = false;
        }

        if (isValid) {
            const submitButton = registerForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Cadastrando...';

            try {
                const registerSuccessful = await registerUser(emailInput.value, passwordInput.value);

                if (registerSuccessful) {
                    displaySuccess('Cadastro realizado com sucesso! Você pode tentar fazer login agora.');
                    emailInput.value = '';
                    passwordInput.value = '';
                    confirmPasswordInput.value = '';

                    // Opcional: Redirecionar para a página de login após o cadastro
                    setTimeout(() => {
                        window.location.href = '/index.html'; // Redireciona para a página inicial ou de login
                    }, 2000);

                } else {
                    displayError(generalError, 'Não foi possível cadastrar o usuário. Tente novamente.'); 
                }
            } catch (error) {
                console.error('Erro ao tentar realizar cadastro:', error);
                displayError(generalError, 'Ocorreu um erro ao tentar cadastrar. Tente novamente.');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Cadastrar';
            }
        }
    });

    // Função assíncrona para simular o processo de cadastro
    async function registerUser(email, password) {
        console.log(`Simulando cadastro de E-mail: ${email} e Senha: ${password}`);
        
        // Simula um atraso de rede de 1 segundo
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        if (isEmailRegistered(email)) {
            console.warn('Tentativa de cadastrar e-mail já existente (verificação interna).');
            return false; 
        }

        // Adiciona o novo usuário ao array (simula salvar no "banco de dados")
        registeredUsers.push({ email: email, password: password }); 
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers)); 

        console.log('Novo usuário cadastrado:', { email: email, password: password });
        return true; 
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePassword(password, minLength) {
        return password.length >= minLength;
    }

    function isEmailRegistered(email) {
        return registeredUsers.some(user => user.email === email);
    }

    function displayError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    }

    function displaySuccess(message) {
        successMessage.textContent = message;
        successMessage.style.display = 'block';
    }

    function clearMessages() {
        emailError.textContent = '';
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';
        successMessage.textContent = '';
        generalError.textContent = '';
        successMessage.style.display = 'none';
        generalError.style.display = 'none';
    }

    // Validação em tempo real
    emailInput.addEventListener('input', function() {
        clearMessages();
        if (emailInput.value.length > 0) {
            if (!validateEmail(emailInput.value)) {
                displayError(emailError, 'Formato de e-mail inválido.');
            } else if (isEmailRegistered(emailInput.value)) {
                displayError(emailError, 'Este e-mail já está cadastrado.');
            } else {
                emailError.textContent = '';
            }
        } else {
             emailError.textContent = '';
        }
    });

    passwordInput.addEventListener('input', function() {
        clearMessages();
        if (passwordInput.value.length > 0 && !validatePassword(passwordInput.value, minPasswordLength)) {
            displayError(passwordError, `A senha precisa ter pelo menos ${minPasswordLength} caracteres.`);
        } else {
            passwordError.textContent = '';
        }
        if (confirmPasswordInput.value.length > 0 && passwordInput.value !== confirmPasswordInput.value) {
            displayError(confirmPasswordError, 'As senhas não coincidem.');
        } else {
            confirmPasswordError.textContent = '';
        }
    });

    confirmPasswordInput.addEventListener('input', function() {
        clearMessages();
        if (confirmPasswordInput.value.length > 0 && passwordInput.value !== confirmPasswordInput.value) {
            displayError(confirmPasswordError, 'As senhas não coincidem.');
        } else {
            confirmPasswordError.textContent = '';
        }
    });
});