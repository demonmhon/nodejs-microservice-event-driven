import 'dotenv/config';
import express, { Application } from 'express';
import amqplib = require('amqplib');

const queue = 'TEST_QUEUE';
const app = express();
const port = process.env.EXPRESS_PORT;

const startSever = async (): Promise<Application> => {
  const conn = await amqplib.connect('amqp://localhost');
  const channel = await conn.createChannel();
  await channel.assertQueue(queue);

  app.get('/', (req, res) => {
    const testMessage = {
      id: 'TEST_ITEM_ID',
      message: 'TEST_MESSAGE',
      qnt: 765,
      date: new Date().toISOString(),
      isStatusX: true,
    };
    console.log('Service A: message send');
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(testMessage)));
    res.json({
      message: 'This will sent message via amqp',
    });
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

  return app;
};

startSever();
