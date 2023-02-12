const Chance = require('chance');
const clientSqs = require('@aws-sdk/client-sqs');
const { SQSClient } = clientSqs;
const REGION = 'us-east-1';
const sqsClient = new SQSClient({ region: REGION });
const chance = new Chance();
const QUEUES = {
  Pickup:
    'https://sqs.us-east-1.amazonaws.com/038834531647/CAPSpickup.fifo',
  Delivered:
    'https://sqs.us-east-1.amazonaws.com/038834531647/CAPSdelivery.fifo',
};

module.exports = { sqsClient, chance, QUEUES };
