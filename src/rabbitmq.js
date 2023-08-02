const amqp = require('amqplib');

async function connectToRabbitMQ() {
    try {
        // Estabelece a conexão com o servidor RabbitMQ na URL 'amqp://localhost'
        const connection = await amqp.connect('amqp://localhost');
        // Cria um canal para realizar as operações no RabbitMQ
        const channel = await connection.createChannel();

        // Nome da fila onde as mensagens serão consumidas
        const queue = 'car_created_queue';
        // Declaração da fila no RabbitMQ com a opção { durable: false }
        // Isso indica que a fila não será persistente, ou seja, será removida após o reinício do servidor RabbitMQ
        await channel.assertQueue(queue, { durable: false });

        // Chama a função consumeFromQueue para começar a consumir a fila
        consumeFromQueue(channel);

        // Retorna o canal para ser usado em outras partes do código
        return channel;
    } catch (error) {
        console.error('Erro ao conectar com o RabbitMQ', error);
    }
}

async function consumeFromQueue(channel) {
    try {
        // Nome da fila onde as mensagens serão consumidas
        const queue = 'car_created_queue';
        // Declaração da fila no RabbitMQ com a opção { durable: false }
        // Isso indica que a fila não será persistente, ou seja, será removida após o reinício do servidor RabbitMQ
        await channel.assertQueue(queue, { durable: false });

        console.log('Aguardando novos carros na fila...');

        // Inicia o consumo da fila
        // Quando uma mensagem chega na fila, a função callback será chamada
        channel.consume(queue, async (message) => {
            if (message !== null) {
                // Converte a mensagem recebida (formato Buffer) para um objeto JavaScript
                const carData = JSON.parse(message.content.toString());
                console.log('Novo carro cadastrado:', carData);

                // Acknowledge (ack) da mensagem
                // Isso informa ao RabbitMQ que a mensagem foi processada com sucesso
                channel.ack(message);

                // Envia o webhook para a URL desejada com os dados do novo carro
                // try {
                //     const webhookURL = 'url do webhook'
                //     await axios.post(webhookURL, carData)
                //     console.log('Webhook enviado')
                // } catch (error) {
                //     console.log('Erro ao enviar webhook', error)
                // }
            }
        });
    } catch (error) {
        console.error('Erro ao consumir a fila do RabbitMQ:', error);
    }
}
module.exports = {connectToRabbitMQ, consumeFromQueue}