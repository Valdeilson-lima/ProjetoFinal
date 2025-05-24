* Tela de Login
![Captura de tela de 2025-05-23 22-15-14](https://github.com/user-attachments/assets/34f1355d-05e4-4e65-8e92-4a0750ea8a7f)

* Tela de Cadastro de Usuário
![Captura de tela de 2025-05-23 22-15-48](https://github.com/user-attachments/assets/ffe51ebb-3094-44f5-89e0-864afae73a4f)

* Tela do CRUD - Listagem
![Captura de tela de 2025-05-23 22-16-08](https://github.com/user-attachments/assets/ae01992e-75d8-4ed3-bc2a-b90f2f40ce91)

* Modal de Cadastro
![Captura de tela de 2025-05-23 22-16-15](https://github.com/user-attachments/assets/d72ad10e-80f3-4129-bdb0-6d667d86f5cf)

* Edição de Produo
![Captura de tela de 2025-05-23 22-16-22](https://github.com/user-attachments/assets/3d5d9adf-7fc4-4139-ac65-bbcf2182d8e0)

* Deleção de Produto
![Captura de tela de 2025-05-23 22-16-46](https://github.com/user-attachments/assets/d8a4fcb4-6c6e-4fd1-b5a9-c9d3b051bf00)









# Sistema de Cadastro de Produtos

Este projeto é um sistema web CRUD (Criar, Ler, Atualizar, Deletar) simples para gerenciar informações de produtos. Ele permite que os usuários registrem, visualizem, editem e excluam registros de produtos, e inclui um sistema básico de autenticação de usuário para login e cadastro.

---

## Funcionalidades

* **Autenticação de Usuário:**
    * **Cadastro de Usuário:** Novos usuários podem criar uma conta com e-mail e senha.
    * **Login de Usuário:** Usuários registrados podem fazer login para acessar as funcionalidades de gerenciamento de produtos.
    * **Funcionalidade de Logout:** Os usuários podem sair de sua sessão de forma segura.
* **Gerenciamento de Produtos (Operações CRUD):**
    * **Cadastrar Produto:** Adicionar novos produtos com detalhes como descrição, quantidade, valor e categoria.
    * **Visualizar Produtos:** Exibir todos os produtos cadastrados em um formato tabular claro.
    * **Editar Produto:** Modificar detalhes de produtos existentes.
    * **Excluir Produto:** Remover produtos do sistema.
* **Armazenamento Local:** O sistema utiliza o **`localStorage` do navegador como um "banco de dados"** para persistir os dados dos produtos e das contas de usuário. Isso significa que as informações ficam salvas no navegador do usuário, mesmo após ele fechar a página.
* **Design Responsivo:** A interface é projetada para ser acessível e utilizável em vários dispositivos, incluindo desktops e celulares.
* **Validação de Formulário:** A validação do lado do cliente garante que os dados do produto sejam inseridos corretamente antes do envio.

---

## Tecnologias Utilizadas

* **HTML5:** Para estruturar as páginas web.
* **CSS3:** Para estilizar a interface do usuário, incluindo:
    * `main.css`: Estilos gerais para a aplicação.
    * `button.css`: Estilos para vários botões.
    * `records.css`: Estilos para a tabela de produtos.
    * `modal.css`: Estilos para o modal de cadastro/edição de produtos.
    * `login.css`: Estilos para as páginas de login e cadastro.
* **JavaScript:** Para funcionalidades dinâmicas, manipulação de formulários, operações CRUD e **interação com o `localStorage`**.
    * `FormCadastro.js`: Lógica para validação do formulário de cadastro de produtos.
    * `login.js`: Lógica para autenticação de usuários.
    * `main.js`: Lógica central para o gerenciamento de produtos.
    * `register.js`: Lógica para o cadastro de usuários.

---

## Contexto do Projeto

Este projeto foi desenvolvido como parte da **avaliação final da disciplina de Desenvolvimento Integrado**, demonstrando habilidades em desenvolvimento front-end e manipulação de dados persistentes utilizando tecnologias web padrões.

---

## Demonstração do Protótipo

Você pode visualizar o protótipo do sistema no Figma através do seguinte link:

* [Protótipo Figma - Sistema de Cadastro de Produtos](https://www.figma.com/proto/sYfDAgxtUqTbqamj1fBDZe/Untitled?node-id=6-13&t=vQjJd65I1kjE6UlD-1&starting-point-node-id=6%3A13)

---

## Primeiros Passos

Para ter uma cópia do projeto funcionando em sua máquina local para fins de desenvolvimento e teste, siga estas etapas:

### Pré-requisitos

Você precisará de um navegador web para abrir os arquivos HTML. Nenhuma configuração de servidor específica é necessária para a funcionalidade básica, pois é um aplicativo do lado do cliente e utiliza o `localStorage` do navegador.

### Instalação

1.  **Clone o repositório:** 
    ```bash
    git clone git@github.com:Valdeilson-lima/ProjetoFinal.git
    ```
2.  **Navegue até o diretório do projeto:**
    ```bash
    cd ProjetoFinal
    ```
3.  **Abra o arquivo `index.html`:** Localize o arquivo `index.html` (ou `cadastro.html` se quiser começar pela página de cadastro) em seu explorador de arquivos e abra-o com seu navegador web preferido.

---

## Como Usar

1.  **Cadastre uma nova conta:** Se você for um novo usuário, navegue até a página de cadastro (por exemplo, `cadastro.html` ou através de um link na página de login) e crie uma conta.
2.  **Faça login:** Use seu e-mail e senha cadastrados para fazer login via `index.html`.
3.  **Gerencie Produtos:**
    * Clique em "**Cadastrar Produto**" para adicionar um novo produto.
    * Use a coluna "**Ação**" na tabela para editar ou excluir produtos existentes.
    * Preencha os campos obrigatórios no modal e clique em "**Salvar**" para salvar as alterações.

---

## Estrutura do Projeto

.
├── css/
│   ├── button.css
│   ├── login.css
│   ├── main.css
│   ├── modal.css
│   └── records.css
├── img/
├── js/
│   ├── FormCadastroo.js
│   ├── login.js
│   ├── main.js
│   └── register.js
├── Pages/
│   ├── cadastro.html              (Página de Cadastro de Usuário)
│   ├── cadastro-produto.html      (Página de Cadastro de Produto)
├── cadastro.html             
└── index.html                     (Página de Login / Página Principal de Gerenciamento de Produtos)
└── README.md                      (Este arquivo)

---

## Contribuindo

Contribuições são bem-vindas! Se você tiver sugestões de melhorias ou encontrar quaisquer problemas, sinta-se à vontade para abrir uma *issue* ou enviar um *pull request*.

---


## Autor

**Valdeilson Lima**
