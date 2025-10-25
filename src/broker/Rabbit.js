// Import RabbitMQ library to connect and talk with RabbitMQ
import amqp from "amqplib"

// Import config file where RabbitMQ URL is stored
import config from "../config/config.js"

// These will store our RabbitMQ connection and channel
let channel, connection;

// ------------------------------
// connect() → connects to RabbitMQ
// ------------------------------
export const connect = async () => {
  // Connect to RabbitMQ using the URL from config
  connection = await amqp.connect(config.RABBITMQ_URI);

  // Create a channel (used to send and receive messages)
  channel = await connection.createChannel();

  // Show message in console when connected
  console.log("RabbitMQ connected");
};

// ------------------------------
// subscribrQueue() → listens for messages in a queue
// ------------------------------
export const subscribrQueue = async (queueName, callback) => {
  // Connect first if channel is not ready
  if (!channel) {
    await connect();
  }

  await channel.assertQueue(queueName, { durable: true });

  channel.consume(queueName, async (data) => {
    const message = JSON.parse(data.content.toString());
    await callback(message);
    channel.ack(data);
  });
};
