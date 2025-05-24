'use strict';

document.addEventListener('DOMContentLoaded', function() {
 
    const openModalButton = document.getElementById('cadastrarProduto');
    
    const modal = document.getElementById('modal'); 
    const closeModalButton = document.getElementById('modalClose');
    const cancelButton = document.getElementById('cancelar');
    const productForm = document.getElementById('form'); 
    const modalTitle = document.getElementById('modalTitle');
    const salvarButton = document.getElementById('salvar');

    const descricaoInput = document.getElementById('descricao');
    const qtdInput = document.getElementById('qtd');
    const valorInput = document.getElementById('valor');
    const categoriaInput = document.getElementById('categoria');

  
    const descricaoError = document.getElementById('descricaoError');
    const qtdError = document.getElementById('qtdError');
    const valorError = document.getElementById('valorError');
    const categoriaError = document.getElementById('categoriaError');

    const tableBody = document.querySelector('#tableProduto > tbody');

    // Referências para Informações do Usuário e Logout
    const userInfoSection = document.getElementById('userInfoSection');
    const loggedInUserSpan = document.getElementById('loggedInUser');
    const logoutButton = document.getElementById('logoutButton');


    // --- 2. Funções de Manipulação do LocalStorage (CRUD Básico) ---
    const getLocalStorage = () => JSON.parse(localStorage.getItem('db_produto')) ?? [];
    const setLocalStorage = (dbProduto) => localStorage.setItem("db_produto", JSON.stringify(dbProduto));

    const createProduto = (produto) => {
        const dbProduto = getLocalStorage();
        dbProduto.push(produto);
        setLocalStorage(dbProduto);
    };

    const readProduto = () => getLocalStorage();

    const updateProduto = (index, produto) => {
        const db_Produto = readProduto();
        db_Produto[index] = produto;
        setLocalStorage(db_Produto);
    };

    const deleteProduto = (index) => {
        const dbProduto = readProduto();
        dbProduto.splice(index, 1);
        setLocalStorage(dbProduto);
    };


    // --- 3. Funções de Autenticação (Controle de Login/Logout) ---
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userEmail = localStorage.getItem('userEmail');

        if (isLoggedIn === 'true' && userEmail) {
            loggedInUserSpan.textContent = `Olá, ${userEmail}!`;
            userInfoSection.classList.add('visible');
        } else {
            // Se não estiver logado, redireciona para a página de login
            
            window.location.href = '/index.html'; 
        }
    }

    function performLogout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        // Redireciona para a página de login
        // Caminho relativo
        window.location.href = '/index.html'; 
    }


    // --- 4. Funções de Manipulação do Modal ---
    function openModal(isEdit = false, productData = {}) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        clearFormFields(); 
        clearValidationMessages(); 

        if (isEdit) {
            modalTitle.textContent = `Editando ${productData.descricao}`;
            fillFields(productData);
            descricaoInput.dataset.index = productData.index; 
        } else {
            modalTitle.textContent = 'Novo Produto';
            descricaoInput.dataset.index = 'new'; 
        }
    }

    function closeModal() {
        clearFormFields(); 
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        clearValidationMessages(); 
    }

    function clearFormFields() {
        descricaoInput.value = '';
        qtdInput.value = '';
        valorInput.value = '';
        categoriaInput.value = '';
        descricaoInput.dataset.index = 'new'; 
        modalTitle.textContent = 'Novo Produto'; 
    }

    function fillFields(produto) {
        descricaoInput.value = produto.descricao;
        qtdInput.value = produto.qtd;
        valorInput.value = produto.valor;
        categoriaInput.value = produto.categoria;
        
    }


    // --- 5. Funções de Validação e Feedback ---
    function clearValidationMessages() {
        // Limpa texto dos spans de erro
        descricaoError.textContent = '';
        qtdError.textContent = '';
        valorError.textContent = '';
        categoriaError.textContent = '';

        // Remove a classe 'invalid' dos inputs
        descricaoInput.classList.remove('invalid');
        qtdInput.classList.remove('invalid');
        valorInput.classList.remove('invalid');
        categoriaInput.classList.remove('invalid');
    }

    function displayError(element, message, inputField) {
        element.textContent = message;
        inputField.classList.add('invalid'); 
    }

    // Validação da Descrição: Não pode estar vazia
    function validateDescricao(descricao) {
        return descricao.trim() !== '';
    }

    // Validação da Quantidade: Deve ser um número maior ou igual a zero (pode ser decimal)
    function validateQuantidade(qtd) {
        const numQtd = parseFloat(qtd);
        return !isNaN(numQtd) && numQtd >= 0;
    }

    // Validação do Valor: Deve ser um número positivo com até duas casas decimais
    function validateValor(valor) {
        const cleanedValor = valor.replace('R$', '').trim().replace(',', '.'); 
        const numValor = parseFloat(cleanedValor);
        const monetaryRegex = /^\d+(\.\d{1,2})?$/; 

        return !isNaN(numValor) && numValor > 0 && monetaryRegex.test(cleanedValor);
    }

    // Validação da Categoria: Não pode estar vazia
    function validateCategoria(categoria) {
        return categoria.trim() !== '';
    }

    // Valida o formulário completo antes de tentar salvar
    function isValidForm() {
        let valid = true;
        
        if (!validateDescricao(descricaoInput.value)) {
            displayError(descricaoError, 'A descrição é obrigatória.', descricaoInput);
            valid = false;
        }

        if (!validateQuantidade(qtdInput.value)) {
            displayError(qtdError, 'Quantidade inválida (número >= 0).', qtdInput);
            valid = false;
        }

        if (!validateValor(valorInput.value)) {
            displayError(valorError, 'Valor inválido (ex: 49.99, maior que zero).', valorInput);
            valid = false;
        }

        if (!validateCategoria(categoriaInput.value)) {
            displayError(categoriaError, 'A categoria é obrigatória.', categoriaInput);
            valid = false;
        }

        return valid;
    }


    // --- 6. Lógica de Salvar/Atualizar Produto e Atualizar Tabela ---
    const saveProductAndRefresh = () => { 
        const produto = {
            descricao: descricaoInput.value,
            qtd: parseFloat(qtdInput.value), 
            valor: parseFloat(valorInput.value.replace('R$', '').trim().replace(',', '.')), 
            categoria: categoriaInput.value
        };
        const index = descricaoInput.dataset.index; 

        if (index === 'new') {
            createProduto(produto);
        } else {
            updateProduto(parseInt(index), produto); 
        }
        updateTable(); 
        closeModal(); 
    };


    // --- 7. Funções para Interagir com a Tabela (Renderização) ---
    const createRow = (produto, index) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${produto.descricao}</td>
            <td>${produto.qtd}</td>
            <td>${parseFloat(produto.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
            <td>${produto.categoria}</td>
            <td>
                <button type="button" class="button green small" id="edit-${index}">Editar</button>
                <button type="button" class="button red small" id="delete-${index}" >Excluir</button>
            </td>
        `;
        tableBody.appendChild(newRow);
    };

    const clearTable = () => {
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.lastChild);
        }
    };

    const updateTable = () => {
        const dbProduto = readProduto(); 
        clearTable(); 
        dbProduto.forEach((produto, index) => createRow(produto, index)); 
    };


    // --- 8. Lógica de Edição e Exclusão (Cliques na Tabela) ---
    const editDelete = (event) => {
        if (event.target.type === 'button') {
            const [action, index] = event.target.id.split('-');
            const parsedIndex = parseInt(index); 

            if (action === 'edit') {
                const produto = readProduto()[parsedIndex];
                produto.index = parsedIndex; 
                openModal(true, produto); 
            } else if (action === 'delete') {
                const produto = readProduto()[parsedIndex];
                const response = confirm(`Deseja realmente excluir o produto "${produto.descricao}"?`);
                if (response) {
                    deleteProduto(parsedIndex); 
                    updateTable(); 
                }
            }
        }
    };


    // --- 9. Inicialização da Aplicação ---
    checkLoginStatus(); 
    updateTable(); 


    // --- 10. Event Listeners Principais ---
    openModalButton.addEventListener('click', () => openModal(false)); 
    closeModalButton.addEventListener('click', closeModal);
    cancelButton.addEventListener('click', closeModal);
    logoutButton.addEventListener('click', performLogout);

    // Evento de envio do formulário (SUBMIT)
    productForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        salvarButton.disabled = true; 
        salvarButton.textContent = 'Salvando...';

        clearValidationMessages(); // Limpa as mensagens de erro antes de revalidar

        if (isValidForm()) { 
            console.log('Formulário de produto válido! Dados a serem salvos:');
            // ... (log dos dados) ...

            // Simula um atraso para dar a sensação de processamento
            setTimeout(() => {
                saveProductAndRefresh(); 
                alert('Produto salvo/atualizado com sucesso!'); 
                salvarButton.disabled = false; 
                salvarButton.textContent = 'Salvar';
            }, 1000); 

        } else {
            console.log('Formulário de produto inválido. Não foi possível salvar.');
            salvarButton.disabled = false;
            salvarButton.textContent = 'Salvar';
        }
    });

    tableBody.addEventListener('click', editDelete);

    // Evento para fechar o modal clicando fora do conteúdo (overlay)
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // --- 11. Validação em tempo real ao digitar (input event) ---
    descricaoInput.addEventListener('input', () => {
        if (descricaoInput.value.trim() === '') {
            displayError(descricaoError, 'A descrição é obrigatória.', descricaoInput);
        } else {
            descricaoError.textContent = '';
            descricaoInput.classList.remove('invalid');
        }
    });

    qtdInput.addEventListener('input', () => {
        if (!validateQuantidade(qtdInput.value)) {
            displayError(qtdError, 'Quantidade inválida (número >= 0).', qtdInput);
        } else {
            qtdError.textContent = '';
            qtdInput.classList.remove('invalid');
        }
    });

    valorInput.addEventListener('input', () => {
        if (!validateValor(valorInput.value)) {
            displayError(valorError, 'Valor inválido (ex: 49.99, maior que zero).', valorInput);
        } else {
            valorError.textContent = '';
            valorInput.classList.remove('invalid');
        }
    });

    categoriaInput.addEventListener('input', () => {
        if (categoriaInput.value.trim() === '') {
            displayError(categoriaError, 'A categoria é obrigatória.', categoriaInput);
        } else {
            categoriaError.textContent = '';
            categoriaInput.classList.remove('invalid');
        }
    });
});