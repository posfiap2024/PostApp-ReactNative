# 📝 PostApp com React Native

Este projeto consiste no desenvolvimento de uma interface gráfica para
uma aplicação de blogging utilizando **React Native**, integrada a
um backend com API REST. O principal objetivo é oferecer uma aplicação
acessível, intuitiva e responsiva para que professores e alunos possam
gerenciar e interagir com postagens.

## 🌐 Demonstração do Projeto

Link de demonstração: *[Vídeo gravado](https://1drv.ms/v/c/a92349b78d645080/ETeAUUSj9SJFmHS16XBk_5EBsa9C4KJu-dftWeOwUy59eQ?e=P986ey)*

---

## 🏗️ Setup Inicial

### Pré-requisitos

Antes de começar, certifique-se de ter os seguintes requisitos
instalados:

- **Node.js** versão 16 ou superior.

- **Expo CLI** (instale usando `npm install -g expo-cli`).

- **Docker** e **Docker Compose** para rodar o backend.

- **Editor de código recomendado:** Visual Studio Code.

### Como rodar o projeto

##### Clone este repositório:
> git clone https://github.com/posfiap2024/PostApp-ReactNative
    
> cd PostApp-ReactNative

1.  Instale as dependências do projeto: 
    > npm install

2.  Inicie o ambiente de desenvolvimento do frontend:npx expo start
    > npx expo start

3.  Certifique-se de que o backend está rodando:

    -   Navegue até o diretório do backend.
        > cd server

    -   Execute: 
        > docker-compose up   

    - Abra o aplicativo no emulador ou no dispositivo físico
        > utilizando o QR code exibido pelo Expo CLI.

**🧱 Arquitetura da Aplicação**

O projeto utiliza uma arquitetura modular e componentizada, focada na
escalabilidade e na fácil manutenção.

**Estrutura de Pastas**

> **assets/:** Recursos estáticos como imagens e fontes.

> **contexts/:** Gerenciamento de estado global utilizando Context
   
> **screens/:** Contém as telas principais da aplicação, como PostList, Login, Admin, etc.

> **services/:** Centraliza todas as chamadas à API e integrações com o backend.

> **App.tsx:** Arquivo principal da aplicação que conecta todas as rotas e provedores.

**Padrões Adotados**

**Componentização:** Todas as telas são divididas em componentes
reutilizáveis.

-   **Gerenciamento de Estado:** Context API é utilizada para autenticação e dados globais.

-   **Integração com Backend:** As chamadas à API estão centralizadas em services/, seguindo o padrão Service Layer.

**📖 Guia de Uso**

**Funcionalidades Principais**

-   **Página Principal**

    > Lista todos os posts disponíveis.

    > Oferece busca por palavras-chave.

    > Mostra título, e descrição de cada post.

-   **Página de Leitura de Post**

    > Exibe o conteúdo completo de um post selecionado.

-   **Página de Criação de Postagens**

    > Formulário para professores e administradores criarem posts.

    > Campos disponíveis: Título e conteúdo.

    > Envia os dados ao servidor.

-   **Página de Edição de Postagens**

    > Carrega os dados existentes de um post para edição.

    > Permite salvar alterações realizadas.

-   **Páginas de Professores e Alunos**

    > Criação: Formulários para cadastro de professores ou alunos.

    > Edição: Permite modificar dados cadastrados.

-   **Página Administrativa**

    > Lista todas as postagens com opções de:

    > Publicar: Disponibiliza o post na página principal.

    > Editar: Leva para a tela de edição.

    > Excluir: Remove a postagem.

-   **Autenticação**

    > Implementada no login.

    > Restringe o acesso às páginas de criação, edição e administração de postagens.

**🚀 Tecnologias Utilizadas**

-   **Frontend:** React Native com Expo.

-   **Backend:** API REST configurada via Docker Compose.

-   **Estilização:** Estilos inline e themes globais.

-   **Gerenciamento de Estado:** Context API.

-   **Navegação:** React Navigation para transições de tela.

**📚 Dificuldades e Desafios**

**Tempo curto de entrega**: Devido a feriados no calendário.

-   **Integração e testes:** Demandaram mais tempo que o previsto.

-   **Aprendizado inicial:** Algumas aulas introdutórias limitaram a profundidade da abordagem.

**💡 Possíveis Melhorias**

- **Testes Automatizados:** Adicionar cobertura de testes unitários e de integração.

- **Melhoria na Responsividade:** Otimizar para diferentes tamanhos de  dispositivos.

- **Funcionalidade de Comentários:** Adicionar suporte completo a comentários nos posts.

- **Melhorias de UI/UX:** Aplicar refinamentos na interface para torná-la mais acessível.