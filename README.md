## API Rest - Prova BHUT

Desafio: Usando Node.JS (TypeScript), crie uma aplicação (API REST) que contenha 3 endpoint, consumindo 2 endpoint de uma api rest externa.

## Como Funciona

Para desenvolvimento deste desafio, utilizei um servidor 'Express.js', um serviço de mensageria 'RabbitMQ' e um banco de dados 'MongoDB'

## Dependências

- Node.js (versão utilizada: 18.14.2)
- MongoDB (versão utilizada: 5.7.0)
- RabbitMQ (versão utilizada: 3.12.2)

## Instalando RabbitMQ

O RabbitMQ é um servidor de mensageria que permite a comunicação assíncrona entre diferentes partes do sistema. Neste projeto o RabbitMQ é conectado de forma local, estabelecendo conexão na URL 'amqp://localhost'.
Para pleno funcionamento é necessário instalar e rodar o RabbitMQ localmente, conforme passo a passo abaixo:

- 1º Acesse: https://www.erlang.org/downloads
- 2º Clique em 'Download Windows Installer'
- 3º Abra o executável e avance até finalizar a instalação
- 4º Acesse: https://www.rabbitmq.com/download.html
- 5º Selecione o instalador de acordo com seu Sistema Operacional
- 6º Execute o instalador com as configurações padrões

## Servidor Express (index.js)

O servidor Express é a peça central do projeto e gerencia as rotas e as operações relacionadas aos carros. Ele utiliza as seguintes bibliotecas e dependências:

- Express: Framework para construção de aplicativos web com Node.js.
- Axios: Cliente HTTP utilizado para fazer requisições à API externa de carros.
- Mongoose: Biblioteca para modelar e interagir com o MongoDB.
- Amqplib: Biblioteca que permite que um programa envie e receba mensagens para outros programas usando o protocolo AMQP (Advanced Message Queuing Protocol)

O servidor fornece as seguintes rotas:

- GET /api/listCars: Obtém a lista de carros a partir de uma API externa de carros.
- GET /api/logs: Obtém os registros de log dos carros criados.
- POST /api/createCar: Cria um novo registro de carro, armazena na API externa e registra o evento no banco de dados.

## 🛠️ Rodando o projeto

###  Instalação das Dependências

Antes de iniciar o projeto, certifique-se de ter o Node.js, o MongoDB configurado e o RabbitMQ instalado em sua máquina.

Primeiramente clone o repositorio 

```bash
# Instale as dependências do projeto
git clone https://github.com/mandudiego/bhut-api.git
```
```bash
# Instale as dependências do projeto
npm install
```
### Definição das váriaveis ambiente
- Crie um arquivo .env na raiz do projeto e defina as variáveis de ambiente necessárias para a configuração do projeto. Utilize o arquivo: .env.example como parâmetro.
```env
MONGO_DB_URL='URL da conexão com MongoDB'
WEBHOOK_URL='URL do Webhook'
``` 
- Insira a URL de seu banco de dados MongoDb e de seu Webhook
 
## Iniciando Servidor 
- Apos a instalação do RabbitMQ, configuração do MongoDB e instalado todas as dependencias 
```bash
# Execute o seguinte codigo no Terminal
npm start
```
- O servidor irá iniciar com a mensagem 'Express started at http://localhost:3000'

## Testando a Aplicaçao 
- Após seguir as etapas de instalação e configuração do projeto, você pode testar a aplicação utilizando uma Ferramente Postman ou qualquer outra ferramenta similar para fazer requisições HTTP.
## Serviço 1 - listCars:
- Abra o Postman ou qualquer outra ferramenta de Requisiçoes HTTP.
- Crie uma nova requisição de tipo GET.
- Insira a URL da rota /api/listCars no campo de URL da requisição.
- Clique em "Send" (Enviar) para fazer a requisição.
- O servidor irá buscar os carros na API externa e retornar uma lista de carros em formato JSON. Você deverá ver a resposta na janela de resposta do Postman.
## Serviço 2 - createCar
- Abra o Postman ou qualquer outra ferramenta de Requisiçoes HTTP
- Crie uma nova requisição de tipo POST.
- Insira a URL da rota /api/createCar no campo de URL da requisição.
- Selecione o body da requisição como  tipo "raw" e escolha o formato JSON.
- No corpo da requisição, insira os dados do carro no seguinte formato:
```json
{
  "title": "Novo Carro",
  "brand": "Marca do Novo Carro",
  "price": "100000",
  "age": 2
}
```
## Serviço 3 - logs
- Abra o Postman ou qualquer outra ferramenta de Requisiçoes HTTP
- Crie uma nova requisição de tipo GET.
- Insira a URL da rota /api/logs no campo de URL da requisição.
- Clique em "Send" (Enviar) para fazer a requisição.
- O servidor irá retornar uma lista de logs em formato JSON. Você deverá ver a resposta na janela de resposta do Postman.
## Considerações finais
Desenvolver este projeto foi uma experiência enriquecedora para mim, pois pude explorar e aprender sobre tecnologias e conceitos com os quais não estava familiarizado, como RabbitMQ e amqplib. Durante o desenvolvimento, tive que me desafiar a entender e aplicar essas bibliotecas para implementar a funcionalidade de comunicação assíncrona entre os diferentes componentes do sistema.

Embora tenha optado por utilizar RabbitMQ neste projeto devido à minha adaptação e compreensão da biblioteca, reconheço que existem outras abordagens para resolver problemas semelhantes. Estou disposto a aprender e explorar outras tecnologias que possam ser mais adequadas para diferentes cenários, pois a busca constante por aprendizado é fundamental para o meu crescimento profissional.

Gostaria de expressar minha gratidão pela oportunidade de participar deste desafio. Independentemente do resultado do processo, o aprendizado adquirido e a experiência obtida são inestimáveis. 
