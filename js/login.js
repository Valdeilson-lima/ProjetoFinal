document.addEventListener('DOMContentLoaded', function() {
    // 1. Referências aos Elementos do DOM
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const successMessage = document.getElementById('successMessage');
    const generalLoginError = document.getElementById('generalLoginError');

    // Opcional: Carregar e-mail do LocalStorage ao carregar a página
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
    }

    // 2. Evento de envio do formulário de login
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault(); 

        clearMessages(); // Limpa todas as mensagens de erro ou sucesso anteriores

        let isValid = true; 
        const minPasswordLength = 6; 

        // Validação de E-mail
        if (!validateEmail(emailInput.value)) {
            displayError(emailError, 'Por favor, insira um e-mail válido.', emailInput); // Passa o input para adicionar a classe 'invalid'
            isValid = false;
        }

        // Validação de Senha
        if (!validatePassword(passwordInput.value, minPasswordLength)) {
            displayError(passwordError, `A senha deve ter pelo menos ${minPasswordLength} caracteres.`, passwordInput); // Passa o input
            isValid = false;
        }

        if (isValid) {
            const submitButton = loginForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Entrando...';

            try {
                // Chama a função assíncrona para simular o login
                const loginSuccessful = await performLogin(emailInput.value, passwordInput.value);

                if (loginSuccessful) {
                    // SALVANDO O E-MAIL E O FLAG DE LOGIN NO LOCALSTORAGE
                    localStorage.setItem('userEmail', emailInput.value); 
                    localStorage.setItem('isLoggedIn', 'true'); // Flag para indicar que o usuário está logado
                    
                    displaySuccess('Login realizado com sucesso! Redirecionando...');
                    setTimeout(() => {
                        console.log("Simulando redirecionamento para o dashboard...");
                        // **CORREÇÃO FINAL DO REDIRECIONAMENTO**: Use o caminho relativo.
                        // Assumimos que 'cadastroProduto.html' está na mesma pasta 'pages/' que 'index.html'.
                        window.location.href = 'pages/cadastroProduto.html'; 
                    }, 2000);

                } else {
                    // Mensagem de erro caso o login falhe (credenciais incorretas)
                    displayError(generalLoginError, 'E-mail ou senha incorretos.', null); // Erro geral não tem input associado
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

    // 3. Função assíncrona para simular o processo de login
    async function performLogin(email, password) {
        console.log(`Tentando login com E-mail: ${email} e Senha: ${password}`);
        
        // Simula um atraso de rede de 1 segundo
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        // Obtém a lista de usuários "cadastrados" do LocalStorage
        // IMPORTANTE: Esta é uma SIMULAÇÃO. Em um projeto real, faria uma chamada API para um backend.
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

        // Verifica se existe um usuário com o e-mail e senha fornecidos
        const userFound = registeredUsers.find(user => user.email === email && user.password === password);

        if (userFound) {
            console.log('Login bem-sucedido (simulado).');
            return true; // Login bem-sucedido
        } else {
            console.log('Login falhou (simulado): E-mail ou senha incorretos.');
            return false; // Login falhou
        }
    }

    // 4. Funções de Validação
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePassword(password, minLength) {
        return password.length >= minLength;
    }

    // 5. Funções para Exibir e Limpar Mensagens (Com feedback visual nos inputs)
    // A função displayError foi ajustada para aceitar o inputField
    function displayError(element, message, inputField) {
        element.textContent = message;
        if (inputField) { // Só adiciona a classe 'invalid' se o inputField for fornecido
            inputField.classList.add('invalid');
        }
        element.style.display = 'block'; // Garante que a mensagem de erro seja visível
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

        // Remove a classe 'invalid' de todos os campos ao limpar
        emailInput.classList.remove('invalid');
        passwordInput.classList.remove('invalid');
    }

    // 6. Validação em tempo real ao digitar (input event)
    emailInput.addEventListener('input', function() {
        clearMessages(); // Limpa todas as mensagens ao digitar
        if (emailInput.value.length > 0 && !validateEmail(emailInput.value)) {
            displayError(emailError, 'Formato de e-mail inválido.', emailInput); // Passa o input
        } else {
            emailError.textContent = '';
            emailInput.classList.remove('invalid'); // Remove a classe 'invalid' se válido
        }
    });

    passwordInput.addEventListener('input', function() {
        clearMessages(); // Limpa todas as mensagens ao digitar
        if (passwordInput.value.length > 0 && !validatePassword(passwordInput.value, minPasswordLength)) {
            displayError(passwordError, `A senha precisa ter pelo menos ${minPasswordLength} caracteres.`, passwordInput); // Passa o input
        } else {
            passwordError.textContent = '';
            passwordInput.classList.remove('invalid'); // Remove a classe 'invalid' se válido
        }
    });
});