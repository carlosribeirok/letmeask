# :busts_in_silhouette: Letmeask

Toda pergunta tem uma resposta! **Do Bootcamp da Rocketseat,** aprenda e compartilhe conhecimento com outras pessoas. A aplicação foi projetada sobre uma relação direta entre admin(criador da sala) e usuário. Com o Letmeask suas perguntas são organizadas de uma maneira sistêmica. Visualização do projeto disponível no [Figma].

## Tecnologias

Tecnologias utilizadas no projeto:

- [React]
- [Typescript]
- [Node]
- [Firebase⠀]

<img src = "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />⠀⠀<img src = "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />⠀⠀<img src = "https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />⠀⠀<img src = "https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black" /> 	

## Instalação

Após clonar o repositório, instalar as dependências do projeto:
```sh
yarn 
```
<img src = "https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white" />

## :fire: Configurando o Firebase

Antes de rodar o projeto, é preciso seguir com algumas etapas. Acesse e crie sua conta no [Firebase].

- Depois de logado, ainda no [Firebase] clique em "Ir para o console"; (Menu superior direito)
- Em seguida, clique em "Adicionar projeto", desative o Google Analytics e crie seu projeto;
- Acesse a página "Authentication"(Menu esquerdo). Clique em "Primeiros passos", selecione o Google, clique em "Ativar" e informe o seu e-mail;
- Entre na página "Realtime Database"(Menu esquerdo). Clique em "Criar banco de dados", continue sem alterar nada e "Ative";
- Acesse a página "Visão geral do projeto"(Menu esquerdo). Clique em </>(Web), entre com o nome do seu projeto. Em seguida "Registre seu app"; (Não marque a caixa "Firebase Hosting")
- Copie toda a "const firebaseConfig" e preencha as respectivas variáveis no arquivo `firebase.ts`. (src/services/firebase.ts) 
```sh
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
```

Por fim, precisamos configurar as regras do banco de dados.   
- Entre novamente no "Realtime Database" e clique em "regras". Copie as linhas de código abaixo e substitua os valores.

```sh
{
  "rules": {
    "rooms": {
      ".read": true,
      ".write": "auth != null",
      "$roomId": {
        ".read": true,
        ".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.uid)",
        "questions": {
          ".read": true,
          ".write": "auth != null && (!data.exists() || data.parent().child('authorId').val() == auth.uid)",
          "likes": {
            ".read": true,
            ".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.uid)",
          }
        }
      }
    }
  }
}
```
Firebase configurado!

## :rocket: Desenvolvimento

Para executar em modo de desenvolvimento, executar: 

```sh
yarn start
```
   
  ## 📝 Licença

Esse projeto foi construído sobre à licença MIT. Feito com o ❤️ por [Carlos]. 

[Carlos]: <https://github.com/carlosribeirok>
[React]: <https://github.com/facebook/react>
[Typescript]: <https://github.com/microsoft/TypeScript>
[Node]: <https://github.com/nodejs>
[Firebase⠀]: <https://github.com/firebase/>
[Firebase]: <https://firebase.google.com/>
[Figma]: <https://www.figma.com/community/file/1009824839797878169>