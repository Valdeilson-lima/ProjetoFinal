
---

## EP3 – Requisitos e Casos de Teste

### Requisitos Funcionais (Histórias de Usuário)

Aqui estão as histórias de usuário que descrevem as funcionalidades do sistema sob a perspectiva do **Administrador de Estoque (Valdeilson Lima)**:

* **HU001: Cadastro de Conta**
    * Como **Valdeilson (Administrador de Estoque)**, quero **cadastrar uma conta** com meu e-mail e senha, para que eu possa ter acesso ao sistema de gerenciamento de produtos.
* **HU002: Login no Sistema**
    * Como **Valdeilson (Administrador de Estoque)**, quero **fazer login** no sistema com meu e-mail e senha, para que eu possa iniciar minhas atividades de gestão de estoque.
* **HU003: Logout Seguro**
    * Como **Valdeilson (Administrador de Estoque)**, quero **fazer logout** do sistema, para garantir que minha sessão esteja segura e ninguém mais acesse minhas informações.
* **HU004: Cadastro de Novo Produto**
    * Como **Valdeilson (Administrador de Estoque)**, quero **cadastrar um novo produto** informando descrição, quantidade, valor e categoria, para que eu possa adicionar novos itens ao estoque.
* **HU005: Visualização de Produtos no Estoque**
    * Como **Valdeilson (Administrador de Estoque)**, quero **visualizar uma lista de todos os produtos cadastrados**, incluindo descrição, quantidade, valor e categoria, para ter uma visão geral e acompanhar o meu estoque.
* **HU006: Edição de Dados do Produto**
    * Como **Valdeilson (Administrador de Estoque)**, quero **editar os detalhes de um produto existente**, para corrigir informações incorretas ou atualizar dados como preço e quantidade.
* **HU007: Exclusão de Produto**
    * Como **Valdeilson (Administrador de Estoque)**, quero **excluir um produto** da lista, para remover itens que não estão mais disponíveis ou foram cadastrados por engano.
* **HU008: Validação de Campos Essenciais (Produto)**
    * Como **Valdeilson (Administrador de Estoque)**, quero que os **campos obrigatórios (Descrição, Quantidade, Valor, Categoria) sejam validados** ao cadastrar ou editar um produto, para garantir que informações cruciais não faltem.
* **HU009: Validação de Formato de E-mail**
    * Como **Valdeilson (Administrador de Estoque)**, quero que o **campo de e-mail seja validado** no cadastro e login, para garantir que o formato digitado esteja correto e o acesso seja possível.
* **HU010: Confirmação de Senha no Cadastro**
    * Como **Valdeilson (Administrador de Estoque)**, quero que a **senha e a confirmação de senha correspondam** durante o cadastro, para evitar erros de digitação e garantir que a senha seja definida corretamente.

---

### Requisitos Não Funcionais

### Requisitos de Usabilidade 

* **RNF-USO-001: Facilidade de Uso:** O sistema deve ser intuitivo e fácil de usar, permitindo que um **administrador de estoque** com conhecimento básico de computadores realize as operações de cadastro, edição e exclusão de produtos com mínima necessidade de treinamento.
* **RNF-USO-002: Feedback Visual:** O sistema deve fornecer feedback visual claro para as ações do usuário (ex: mensagens de sucesso após salvar, mensagens de erro para validação de campo, indicadores de carregamento quando aplicável).
* **RNF-USO-003: Responsividade da Interface:** A interface do usuário deve ser **responsiva**, adaptando-se e sendo totalmente funcional em diferentes tamanhos de tela (desktops, tablets e smartphones), garantindo uma boa experiência em dispositivos móveis.

### Requisitos de Desempenho 

* **RNF-DES-001: Tempo de Resposta da Interface:** O tempo de resposta para ações típicas (ex: abrir o modal de cadastro, salvar um produto, carregar a lista de produtos) não deve exceder **2 segundos** em condições normais de uso e em navegadores modernos.
* **RNF-DES-002: Carregamento Inicial:** A página principal do sistema (após o login) deve carregar completamente em no máximo **3 segundos** em uma conexão de internet padrão (ex: 5 Mbps).

### Requisitos de Segurança 

* **RNF-SEG-001: Armazenamento de Credenciais:** As senhas dos usuários devem ser **armazenadas de forma segura** (idealmente, "hashed" e "salted") no `localStorage` ou em qualquer mecanismo de persistência, evitando que sejam facilmente legíveis em texto puro.
* **RNF-SEG-002: Proteção de Dados Sensíveis:** Informações sensíveis, como senhas, não devem ser expostas em logs do navegador ou em qualquer console de desenvolvimento.
* **RNF-SEG-003: Controle de Acesso Pós-Login:** Após o logout, o acesso às páginas restritas do sistema (como a tela de gerenciamento de produtos) deve ser **impedida**, exigindo um novo login.

### Requisitos de Confiabilidade 

* **RNF-CON-001: Persistência de Dados:** Os dados de produtos e usuários armazenados no `localStorage` devem **persistir corretamente** entre as sessões do navegador, garantindo que as informações não sejam perdidas após o fechamento do navegador.
* **RNF-CON-002: Tratamento de Erros:** O sistema deve tratar e exibir mensagens amigáveis para erros inesperados do usuário (ex: tentativas de salvar com dados inconsistentes), em vez de falhar abruptamente.



---

### Casos de Teste Manuais

Com base nas histórias de usuário acima, aqui estão alguns casos de teste manuais para verificar as funcionalidades do sistema.

#### Testes de Autenticação

* **CT-AUT-001: Cadastro de Conta - Sucesso**
    * **Descrição:** Valdeilson cadastra uma nova conta com e-mail e senha válidos e as senhas coincidem.
    * **Pré-condições:** Nenhuma conta com o e-mail informado existe.
    * **Passos:**
        1.  Acessar a página de cadastro (`cadastro.html`).
        2.  Inserir um e-mail válido (ex: `valdeilson.adm@email.com`).
        3.  Inserir uma senha (ex: `MinhaSenhaSegura123!`).
        4.  Confirmar a senha (ex: `MinhaSenhaSegura123!`).
        5.  Clicar no botão "Cadastrar".
    * **Resultado Esperado:** Mensagem de sucesso no cadastro exibida, e Valdeilson é redirecionado para a página de login.

* **CT-AUT-002: Cadastro de Conta - E-mail Inválido**
    * **Descrição:** Valdeilson tenta cadastrar uma conta com e-mail em formato inválido.
    * **Pré-condições:** Nenhuma.
    * **Passos:**
        1.  Acessar a página de cadastro (`cadastro.html`).
        2.  Inserir um e-mail inválido (ex: `valdeilson@email` ou `valdeilson`).
        3.  Inserir uma senha e confirmar.
        4.  Clicar no botão "Cadastrar".
    * **Resultado Esperado:** Uma mensagem de erro específica para o formato de e-mail inválido é exibida abaixo do campo de e-mail. O cadastro não é concluído.

* **CT-AUT-003: Cadastro de Conta - Senhas Não Coincidem**
    * **Descrição:** Valdeilson tenta cadastrar uma conta onde a senha e a confirmação de senha não são iguais.
    * **Pré-condições:** Nenhuma.
    * **Passos:**
        1.  Acessar a página de cadastro (`cadastro.html`).
        2.  Inserir um e-mail válido.
        3.  Inserir uma senha (ex: `Senha123!`).
        4.  Confirmar a senha com um valor diferente (ex: `Senha456!`).
        5.  Clicar no botão "Cadastrar".
    * **Resultado Esperado:** Uma mensagem de erro indicando que as senhas não coincidem é exibida abaixo do campo de confirmação de senha. O cadastro não é concluído.

* **CT-AUT-004: Login no Sistema - Sucesso**
    * **Descrição:** Valdeilson faz login com credenciais válidas.
    * **Pré-condições:** A conta de Valdeilson (ex: `valdeilson.adm@email.com` com senha `MinhaSenhaSegura123!`) está previamente cadastrada.
    * **Passos:**
        1.  Acessar a página de login (`index.html`).
        2.  Inserir o e-mail cadastrado.
        3.  Inserir a senha correta.
        4.  Clicar no botão "Entrar".
    * **Resultado Esperado:** Valdeilson é redirecionado para a tela principal de gerenciamento de produtos, e seu e-mail (`valdeilson.adm@email.com`) é exibido no cabeçalho.

* **CT-AUT-005: Login no Sistema - Credenciais Inválidas**
    * **Descrição:** Valdeilson tenta fazer login com e-mail ou senha incorretos.
    * **Pré-condições:** A conta de Valdeilson está cadastrada.
    * **Passos:**
        1.  Acessar a página de login (`index.html`).
        2.  Inserir um e-mail **não cadastrado** ou uma **senha incorreta** para o e-mail cadastrado.
        3.  Clicar no botão "Entrar".
    * **Resultado Esperado:** Uma mensagem de erro indicando "Usuário ou senha inválidos" ou similar é exibida. O login não é efetuado.

* **CT-AUT-006: Logout Seguro**
    * **Descrição:** Valdeilson realiza o logout do sistema.
    * **Pré-condições:** Valdeilson está logado no sistema (na tela de gerenciamento de produtos).
    * **Passos:**
        1.  Na tela de gerenciamento de produtos, clicar no botão "Sair".
    * **Resultado Esperado:** Valdeilson é redirecionado para a página de login, e seu e-mail não é mais exibido no cabeçalho.

#### Testes de Gerenciamento de Produtos

* **CT-PROD-001: Cadastro de Novo Produto - Sucesso**
    * **Descrição:** Valdeilson cadastra um novo produto com todos os campos válidos.
    * **Pré-condições:** Valdeilson está logado no sistema.
    * **Passos:**
        1.  Clicar no botão "Cadastrar Produto".
        2.  Preencher "Descrição": `Monitor Gamer`.
        3.  Preencher "Quantidade": `10`.
        4.  Preencher "Valor": `1500.00`.
        5.  Preencher "Categoria": `Eletrônicos`.
        6.  Clicar no botão "Salvar".
    * **Resultado Esperado:** O modal de cadastro fecha, e o novo produto aparece na tabela de produtos com as informações corretas.

* **CT-PROD-002: Cadastro de Novo Produto - Campo Descrição Vazio**
    * **Descrição:** Valdeilson tenta cadastrar um produto deixando o campo "Descrição" vazio.
    * **Pré-condições:** Valdeilson está logado no sistema.
    * **Passos:**
        1.  Clicar no botão "Cadastrar Produto".
        2.  Deixar "Descrição" em branco.
        3.  Preencher "Quantidade": `5`.
        4.  Preencher "Valor": `50.00`.
        5.  Preencher "Categoria": `Escritório`.
        6.  Clicar no botão "Salvar".
    * **Resultado Esperado:** Uma mensagem de erro (ex: "Campo obrigatório") é exibida abaixo do campo "Descrição". O modal não fecha e o produto não é salvo.

* **CT-PROD-003: Edição de Dados do Produto - Sucesso**
    * **Descrição:** Valdeilson edita um produto existente e verifica se as alterações foram salvas.
    * **Pré-condições:** Valdeilson está logado no sistema e pelo menos um produto cadastrado.
    * **Passos:**
        1.  Identificar um produto na tabela (ex: "Monitor Gamer").
        2.  Clicar no ícone de edição (lápis) na linha do produto desejado.
        3.  Alterar o campo "Quantidade" (ex: de `10` para `8`).
        4.  Clicar no botão "Salvar".
    * **Resultado Esperado:** O modal de edição closes, and the product's quantity in the table is updated to `8`.

* **CT-PROD-004: Exclusão de Produto - Sucesso**
    * **Descrição:** Valdeilson exclui um produto da tabela.
    * **Pré-condições:** Valdeilson está logado no sistema e pelo menos um produto cadastrado.
    * **Passos:**
        1.  Identificar um produto na tabela (ex: "Caneta Azul").
        2.  Clicar no ícone de exclusão (lixeira) na linha do produto desejado.
        3.  Confirmar a exclusão (se houver uma caixa de diálogo de confirmação).
    * **Resultado Esperado:** O produto "Caneta Azul" é removido da tabela de produtos.

* **CT-PROD-005: Visualização de Produtos - Tabela Vazia**
    * **Descrição:** Valdeilson acessa a tela de produtos sem nenhum item cadastrado.
    * **Pré-condições:** Valdeilson está logado, e nenhum produto cadastrado no `localStorage`.
    * **Passos:**
        1.  Valdeilson faz login no sistema.
    * **Resultado Esperado:** A tabela de produtos é exibida, mas seu corpo (`<tbody>`) está vazio (sem linhas de produto).