
<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/TIAGOLL/business_control?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/TIAGOLL/business_control">

  
  <a href="https://github.com/TIAGOLL/business_control/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/TIAGOLL/business_control">
  </a>
    
   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
   <a href="https://github.com/TIAGOLL/business_control/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/TIAGOLL/business_control?style=social">
  </a>

  <a href="https://www.tiagoll.vercel.app/">
    <img alt="Feito pela Rocketseat" src="https://img.shields.io/badge/feito%20por-Tiago-%237519C1">
  </a>
  
  <a href="https://www.tiagoll.vercel.app/">
    <img alt="Stargazers" src="https://img.shields.io/badge/Portfólio-%237159c1?style=flat&logo=ghost">
    </a>
  
 
</p>


## 💻 Sobre o projeto

 📈 - Sistema de controle de logística empresarial para pequenas e grandes empresas.

---

## ⚙️ Funcionalidades

- [x] Cadastro de produtos
- [x] Cadastro de pedidos (entrada de estoque)
- [x] Cadastro de usuários
- [x] Autenticação de usuários
- [x] Dashboard com informações para tomadas de decisões estratégicas
- [ ] Gerar CSV dos produtos para a inclusão em marketplaces
- [ ] Espaço para gerenciamento de pedidos de reembolso do cliente final
- [ ] Autenticação para o espaço admin
- [ ] Cadastro de clientes
- [ ] Manipulação de permissões
- [ ] Cadastro de fornecedores
- [ ] Cadastro de transportadoras
- [ ] Cadastro de funcionários
- [ ] Cadastro de filiais
- [ ] Cadastro de tributos
- [ ] Cadastro de metas

## ⚙️ Diferenciais

- [x] Banco de dados relacional
- [x] API externa para manipulação de dados
- [x] Testes automatizados
- [x] SideBar responsiva
- [x] Login com o Google
- [ ] Documentação do Frontend
- [ ] Documentação da API
- [ ] Deploy automatizado
- [ ] Dockerização
- [ ] Criptografia de dados
- [ ] Autenticação de dois fatores

## ⚙️ Features

- [x] O lucro de um produto é calculado encima do ultimo pedido feito
- [x] O sistema não contabiliza no estoque se um produto está em trânsito
- [x] O sistema informa os produtos que possui um estoque baixo
- [x] O sistema informa qual foram seus lucros, faturamento e investimento

---

## 🚀 Como executar o projeto

Este projeto é divido em duas partes:
1. Backend (pasta server) 
2. Frontend (pasta web)

💡O Frontend precisa que o Backend esteja sendo executado para funcionar.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 🎲 Rodando a aplicação

```bash

# Clone este repositório
$ git clone https://github.com/TIAGOLL/business_control.git

# Acesse a pasta do projeto no terminal/cmd
$ cd ./Back-end

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3030 - acesse http://localhost:3030 
# De um CTRL + clique no link acima para abrir no navegador

# Abra outro terminal e acesse a pasta do repositório
$ cd business_control

# Vá para a pasta da aplicação Front-End
$  cd ./Front-end

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:5173 - acesse http://localhost:5173
# De um CTRL + clique no link acima para abrir no navegador

```

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Website**  ([React](https://reactjs.org/))

-   **React Router Dom**
-   **Lucide-react**
-   **Axios**
-   **Redux Toolkit**
-   **Toastfy**
-   **Tailwind**
-   **Vite**

> Veja o arquivo  [package.json](https://github.com/TIAGOLL/business_control/blob/main/Front-end/package.json)

#### **Server**  ([NodeJS](https://nodejs.org/en/))

-   **Express**
-   **Prisma**
-   **Cors**
-   **Tsup**
-   **Tsx**

> Veja o arquivo  [package.json](https://github.com/TIAGOLL/business_control/blob/main/Back-end/package.json)


#### [](https://github.com/TIAGOLL/Ecoleta#utilit%C3%A1rios)**Utilitários**


-   Editor:  **[Visual Studio Code](https://code.visualstudio.com/)**
-   Teste de API:  **[Postman](https://www.postman.com/)**
-   Ícones:  **[Lucide](https://lucide.dev/icons/)**


---

## 💪 Como contribuir para o projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`

---

## 🦸 Autor

<a href="https://www.tiagoll.vercel.app/">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/107972949?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Tiago Emanuel</b></sub></a> <a href="https://www.tiagoll.vercel.app/" title="Portfólio">🚀</a>
 <br />

[![Linkedin Badge](https://img.shields.io/badge/-Tiago-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/tiago-emanuel-de-lima)](https://www.linkedin.com/in/tiago-emanuel-de-lima)

---

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

Feito com ❤️ por Tiago Emanuel 👋🏽 [Entre em contato!](https://www.linkedin.com/in/tiago-emanuel-de-lima)