import 'dotenv/config';
import express, { Application } from 'express';
import amqplib = require('amqplib');

const queue = 'TEST_QUEUE';
const app = express();
const port = process.env.EXPRESS_PORT;

const startSever = async (): Promise<Application> => {
  const mockStorage: any[] = [];
  const conn = await amqplib.connect('amqp://localhost');
  const channel = await conn.createChannel();

  channel.consume(queue, (message) => {
    if (message !== null) {
      console.log('Service B: message recieved:', message.content.toString());
      channel.ack(message);
      mockStorage.push(message.content.toString());
    } else {
      console.log('Consumer cancelled by server');
    }
  });

  app.get('/', (req, res) => {
    res.json({
      details: 'messages from amqp',
      data: mockStorage
    })
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

  return app;
};

startSever();
