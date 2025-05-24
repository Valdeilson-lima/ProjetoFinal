document.addEventListener('DOMContentLoaded', function() {
    const openModalButton = document.getElementById('cadastrarProduto');
    const modal = document.getElementById('modal');
    const closeModalButton = document.getElementById('modalClose');
    const cancelButton = document.getElementById('cancelar');
    const productForm = document.getElementById('form');
    const modalTitle = document.getElementById('modalTitle');

    const descricaoInput = document.getElementById('descricao');
    const qtdInput = document.getElementById('qtd');
    const valorInput = document.getElementById('valor');
    const categoriaInput = document.getElementById('categoria');

    const descricaoError = document.getElementById('descricaoError');
    const qtdError = document.getElementById('qtdError');
    const valorError = document.getElementById('valorError');
    const categoriaError = document.getElementById('categoriaError');

    const salvarButton = document.getElementById('salvar');

    function openModal() {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        modalTitle.textContent = 'Novo Produto';
        clearFormFields();
        clearValidationMessages();
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        clearFormFields();
        clearValidationMessages();
    }

    function clearFormFields() {
        descricaoInput.value = '';
        qtdInput.value = '';
        valorInput.value = '';
        categoriaInput.value = '';
        descricaoInput.dataset.index = 'new';
    }

    function clearValidationMessages() {
        descricaoError.textContent = '';
        qtdError.textContent = '';
        valorError.textContent = '';
        categoriaError.textContent = '';

        descricaoInput.classList.remove('invalid');
        qtdInput.classList.remove('invalid');
        valorInput.classList.remove('invalid');
        categoriaInput.classList.remove('invalid');
    }

    function displayError(element, message, inputField) {
        element.textContent = message;
        inputField.classList.add('invalid');
    }

    function validateDescricao(descricao) {
        return descricao.trim() !== '';
    }

    function validateQuantidade(qtd) {
        const numQtd = parseFloat(qtd);
        return !isNaN(numQtd) && numQtd >= 0;
    }

    function validateValor(valor) {
        const cleanedValor = valor.replace('R$', '').trim().replace(',', '.');
        const numValor = parseFloat(cleanedValor);
        const monetaryRegex = /^\d+(\.\d{1,2})?$/; 

        return !isNaN(numValor) && numValor > 0 && monetaryRegex.test(cleanedValor);
    }

    function validateCategoria(categoria) {
        return categoria.trim() !== '';
    }

    function isValidForm() {
        let valid = true;
        clearValidationMessages();

        if (!validateDescricao(descricaoInput.value)) {
            displayError(descricaoError, 'A descrição é obrigatória.', descricaoInput);
            valid = false;
        }

        if (!validateQuantidade(qtdInput.value)) {
            displayError(qtdError, 'Quantidade inválida (deve ser um número >= 0).', qtdInput);
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

    openModalButton.addEventListener('click', openModal);

    closeModalButton.addEventListener('click', closeModal);

    cancelButton.addEventListener('click', closeModal);

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    productForm.addEventListener('submit', function(event) {
        event.preventDefault();

        salvarButton.disabled = true;
        salvarButton.textContent = 'Salvando...';

        if (isValidForm()) {
            console.log('Formulário de produto válido! Dados a serem salvos:');
            console.log('Descrição:', descricaoInput.value);
            console.log('Quantidade:', qtdInput.value);
            console.log('Valor:', valorInput.value);
            console.log('Categoria:', categoriaInput.value);

            setTimeout(() => {
                alert('Produto salvo/atualizado com sucesso! (Simulação)');
                closeModal();
                salvarButton.disabled = false;
                salvarButton.textContent = 'Salvar';
            }, 1500);

        } else {
            console.log('Formulário de produto inválido.');
            salvarButton.disabled = false;
            salvarButton.textContent = 'Salvar';
        }
    });

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