// main.js

document.addEventListener('DOMContentLoaded', function() {
    // 1. Referências aos Elementos do DOM
    const openModalButton = document.getElementById('cadastrarProduto');
    const modal = document.getElementById('modal'); // Seu modal tem id="modal-header" no HTML, vamos ajustar isso para id="modal" para ser mais consistente com o CSS
    const closeModalButton = document.getElementById('modalClose');
    const cancelButton = document.getElementById('cancelar');
    const productForm = document.getElementById('form'); // O formulário dentro do modal
    const modalTitle = document.getElementById('modalTitle');

    // Campos do formulário e seus respectivos elementos de erro
    const descricaoInput = document.getElementById('descricao');
    const qtdInput = document.getElementById('qtd'); // Mantendo 'qtd' conforme seu HTML
    const valorInput = document.getElementById('valor');
    const categoriaInput = document.getElementById('categoria');

    const descricaoError = document.getElementById('descricaoError'); // Span para erros da descrição
    const qtdError = document.getElementById('qtdError');             // Span para erros da quantidade
    const valorError = document.getElementById('valorError');         // Span para erros do valor
    const categoriaError = document.getElementById('categoriaError'); // Span para erros da categoria

    const salvarButton = document.getElementById('salvar'); // Botão Salvar

    // --- FUNÇÕES DE MANIPULAÇÃO DO MODAL ---

    // Função para abrir o modal
    function openModal() {
        modal.classList.add('active'); // Adiciona a classe 'active' para mostrar o modal
        modal.setAttribute('aria-hidden', 'false'); // Torna o modal visível para leitores de tela
        modalTitle.textContent = 'Novo Produto'; // Define o título inicial do modal
        clearFormFields(); // Limpa os campos do formulário ao abrir
        clearValidationMessages(); // Limpa mensagens de erro
    }

    // Função para fechar o modal
    function closeModal() {
        modal.classList.remove('active'); // Remove a classe 'active' para esconder o modal
        modal.setAttribute('aria-hidden', 'true'); // Oculta o modal de leitores de tela
        clearFormFields(); // Limpa os campos do formulário ao fechar
        clearValidationMessages(); // Limpa mensagens de erro
    }

    // Função para limpar os campos do formulário
    function clearFormFields() {
        descricaoInput.value = '';
        qtdInput.value = '';
        valorInput.value = '';
        categoriaInput.value = '';
        descricaoInput.dataset.index = 'new'; // Reseta o data-index para 'new' para indicar novo produto
    }

    // --- FUNÇÕES DE VALIDAÇÃO E FEEDBACK ---

    // Limpa todas as mensagens de erro de validação
    function clearValidationMessages() {
        descricaoError.textContent = '';
        qtdError.textContent = '';
        valorError.textContent = '';
        categoriaError.textContent = '';

        // Remove a classe de erro visual dos campos, se houver
        descricaoInput.classList.remove('invalid');
        qtdInput.classList.remove('invalid');
        valorInput.classList.remove('invalid');
        categoriaInput.classList.remove('invalid');
    }

    // Exibe uma mensagem de erro para um campo específico
    function displayError(element, message, inputField) {
        element.textContent = message;
        inputField.classList.add('invalid'); // Adiciona uma classe para estilizar o campo com erro (você precisará adicionar CSS para isso)
    }

    // Validação da Descrição: Não pode estar vazia
    function validateDescricao(descricao) {
        return descricao.trim() !== '';
    }

    // Validação da Quantidade: Deve ser um número maior ou igual a zero
    function validateQuantidade(qtd) {
        const numQtd = parseFloat(qtd);
        return !isNaN(numQtd) && numQtd >= 0;
    }

    // Validação do Valor: Deve ser um número positivo (formato R$XX.YY)
    function validateValor(valor) {
        // Remove 'R$', espaços e substitui vírgula por ponto para validação numérica
        const cleanedValor = valor.replace('R$', '').trim().replace(',', '.');
        const numValor = parseFloat(cleanedValor);
        // Regex para verificar formato monetário (opcional, mas bom ter)
        const monetaryRegex = /^\d+(\.\d{1,2})?$/; 

        return !isNaN(numValor) && numValor > 0 && monetaryRegex.test(cleanedValor);
    }

    // Validação da Categoria: Não pode estar vazia
    function validateCategoria(categoria) {
        return categoria.trim() !== '';
    }

    // --- LÓGICA PRINCIPAL DO FORMULÁRIO ---

    // Função para validar o formulário completo antes de "salvar"
    function isValidForm() {
        let valid = true;
        clearValidationMessages(); // Limpa mensagens antes de revalidar

        // Validação da Descrição
        if (!validateDescricao(descricaoInput.value)) {
            displayError(descricaoError, 'A descrição é obrigatória.', descricaoInput);
            valid = false;
        }

        // Validação da Quantidade
        if (!validateQuantidade(qtdInput.value)) {
            displayError(qtdError, 'Quantidade inválida (deve ser um número >= 0).', qtdInput);
            valid = false;
        }

        // Validação do Valor
        if (!validateValor(valorInput.value)) {
            displayError(valorError, 'Valor inválido (ex: 49.99, maior que zero).', valorInput);
            valid = false;
        }

        // Validação da Categoria
        if (!validateCategoria(categoriaInput.value)) {
            displayError(categoriaError, 'A categoria é obrigatória.', categoriaInput);
            valid = false;
        }

        return valid;
    }

    // --- EVENT LISTENERS ---

    // Evento para abrir o modal
    openModalButton.addEventListener('click', openModal);

    // Evento para fechar o modal pelo botão 'x'
    closeModalButton.addEventListener('click', closeModal);

    // Evento para fechar o modal pelo botão 'Cancelar'
    cancelButton.addEventListener('click', closeModal);

    // Evento para fechar o modal clicando fora do conteúdo
    modal.addEventListener('click', function(e) {
        if (e.target === modal) { // Verifica se o clique foi no overlay e não no conteúdo do modal
            closeModal();
        }
    });

    // Evento de envio do formulário
    productForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o comportamento padrão de envio

        salvarButton.disabled = true; // Desabilita o botão para evitar múltiplos cliques
        salvarButton.textContent = 'Salvando...';

        if (isValidForm()) {
            console.log('Formulário de produto válido! Dados a serem salvos:');
            console.log('Descrição:', descricaoInput.value);
            console.log('Quantidade:', qtdInput.value);
            console.log('Valor:', valorInput.value);
            console.log('Categoria:', categoriaInput.value);

            // TODO: Aqui você implementaria a lógica para SALVAR/ATUALIZAR o produto
            // Por exemplo:
            // saveProduct({
            //     descricao: descricaoInput.value,
            //     quantidade: parseFloat(qtdInput.value),
            //     valor: parseFloat(valorInput.value.replace('R$', '').trim().replace(',', '.')),
            //     categoria: categoriaInput.value
            // });

            // Simula um atraso para dar a sensação de processamento
            setTimeout(() => {
                alert('Produto salvo/atualizado com sucesso! (Simulação)');
                closeModal(); // Fecha o modal após o "salvamento"
                salvarButton.disabled = false; // Reabilita o botão
                salvarButton.textContent = 'Salvar';
                // TODO: Chamar a função para atualizar a tabela de produtos
            }, 1500);

        } else {
            console.log('Formulário de produto inválido.');
            salvarButton.disabled = false; // Reabilita o botão em caso de validação falha
            salvarButton.textContent = 'Salvar';
        }
    });

    // --- Melhoria: Validação em tempo real ao digitar (input event) ---
    // Você pode adicionar classes CSS para '.invalid' nos seus arquivos .css
    // Ex: .modal-field.invalid { border-color: #dc3545; box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.25); }

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
            displayError(qtdError, 'Quantidade inválida (deve ser um número >= 0).', qtdInput);
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