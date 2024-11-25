# 📝 PostApp com React Native

Este projeto consiste no desenvolvimento de uma interface gráfica para
uma aplicação de blogging utilizando \*\*React Native\*\*, integrada a
um backend com API REST. O principal objetivo é oferecer uma aplicação
acessível, intuitiva e responsiva para que professores e alunos possam
gerenciar e interagir com postagens.

## 🌐 Demonstração do Projeto

Link de demonstração: \*(adicionar link aqui quando disponível)\*

\-\--

## 🏗️ Setup Inicial

### Pré-requisitos

Antes de começar, certifique-se de ter os seguintes requisitos
instalados:

\- \*\*Node.js\*\* versão 16 ou superior.

\- \*\*Expo CLI\*\* (instale usando \`npm install -g expo-cli\`).

\- \*\*Docker\*\* e \*\*Docker Compose\*\* para rodar o backend.

\- Editor de código recomendado: \*\*Visual Studio Code\*\*.

### Como rodar o projeto

##### Clone este repositório:

git clone https://github.com/posfiap2024/PostApp-ReactNative

cd PostApp-ReactNative

1.  Instale as dependências do projeto: npm install

2.  Inicie o ambiente de desenvolvimento do frontend:npx expo start
    > start




3.  Certifique-se de que o backend está rodando:

    -   Navegue até o diretório do backend.

        > Execute: docker-compose up

      

        > Abra o aplicativo no emulador ou no dispositivo físico
        > utilizando o QR code exibido pelo Expo CLI.

**🧱 Arquitetura da Aplicação**

O projeto utiliza uma arquitetura modular e componentizada, focada na
escalabilidade e na fácil manutenção.

**Estrutura de Pastas**

**assets/: Re**cursos estáticos como imagens e fontes.

-   cont**exts/: Ge**renciamento de estado global utilizando Context
   
    > scre**ens/: Co**ntém as telas principais da aplicação, como PostList,
    > Login, Admin, etc.

    > serv**ices/: Ce**ntraliza todas as chamadas à API e integrações
    > com o backend.

    > App.tsx: Arquivo principal da aplicação que conecta todas as rotas
    > e provedores.

**Padrões Adotados**

**Componentização: To**das as telas são divididas em componentes
reutilizáveis.

-   Gere**nciamento de Estado: Co**ntext API é utilizada para
    > autenticação e dados globais.

    > Inte**gração com Backend: As** chamadas à API estão centralizadas
    > em serv**ices/, se**guindo o padrão Service Layer.

**📖 Guia de Uso**

**Funcionalidades Principais**

-   **Página Principal**

    > **List**a todos os posts disponíveis.

    -   Oferece busca por palavras-chave.

        > Mostra título, e descrição de cada post.

    > **Página de Leitura de Post**

    > **Exib**e o conteúdo completo de um post selecionado.

    > **Página de Criação de Postagens**

    > **Form**ulário para professores e administradores criarem posts.

    -   Campos disponíveis: Título e conteúdo.

        > Envia os dados ao servidor.

    > **Página de Edição de Postagens**

    > **Carr**ega os dados existentes de um post para edição.

    -   Permite salvar alterações realizadas.

    > **Páginas de Professores e Alunos**

    > **Cria**ç**ão: For**mulários para cadastro de professores ou
    > alunos.

    -   Ediçã**o: Per**mite modificar dados cadastrados.


    > **Página Administrativa**

    > **List**a todas as postagens com opções de:

    -   Publi**car: Dis**ponibiliza o post na página principal.

        -   Edita**r: Lev**a para a tela de edição.

            > Exclu**ir: Rem**ove a postagem.

    > **Autenticação**

    > **Impl**ementada no login.

    -   Restringe o acesso às páginas de criação, edição e administração
        > de postagens.

**🚀 Tecnologias Utilizadas**

**Frontend: Reac**t Native com Expo.

-   Backen**d: API** REST configurada via Docker Compose.

    > Estili**zação: Esti**los inline e themes globais.

    > **Gerenciamento de Estado: Cont**ext API.

    > Navega**ção: Reac**t Navigation para transições de tela.

**📚 Dificuldades e Desafios**

**Tempo curto de entrega: Devid**o a feriados no calendário.

-   Integra**ção e testes: Deman**daram mais tempo que o previsto.

    > Aprendi**zado inicial: Algum**as aulas introdutórias limitaram a
    > profundidade da abordagem.

**💡 Possíveis Melhorias**

**Testes Automatizados: Adicio**nar cobertura de testes unitários e de
integração.

-   Melhoria **na Responsividade: Otimiz**ar para diferentes tamanhos de
    > dispositivos.

    > Funciona**lidade de Comentários: Adicio**nar suporte completo a
    > comentários nos posts.

    > Melhoria**s de UI/UX: Aplica**r refinamentos na interface para
    > torná-la com mais acessibilidade.

    > 

