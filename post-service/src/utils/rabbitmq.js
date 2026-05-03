import amqp from "amqplib";
import logger from "./logger.js";

let connection = null;
let channel = null;

const EXCHANGE_NAME = "facebook_events";

<<<<<<< HEAD
export async function connectToRabbitMQ() {
=======
async function connectToRabbitMQ() {
>>>>>>> 452b70bc9fdd1bb39e19c04a001b1a1adbc18377
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE_NAME, "topic", { durable: false });
    logger.info("Connected to rabbit mq");
    return channel;
  } catch (e) {
    logger.error("Error connecting to rabbit mq", e);
  }
}

<<<<<<< HEAD
export async function publishEvent(routingKey, message) {
=======
async function publishEvent(routingKey, message) {
>>>>>>> 452b70bc9fdd1bb39e19c04a001b1a1adbc18377
  if (!channel) {
    await connectToRabbitMQ();
  }

  channel.publish(
    EXCHANGE_NAME,
    routingKey,
    Buffer.from(JSON.stringify(message))
  );
  logger.info(`Event published: ${routingKey}`);
}
<<<<<<< HEAD
=======

module.exports = { connectToRabbitMQ, publishEvent };
>>>>>>> 452b70bc9fdd1bb39e19c04a001b1a1adbc18377
