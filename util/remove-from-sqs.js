/* istanbul ignore file */
const AWS = require('aws-sdk');
require('dotenv').config();

const {
  AWS_API_VERSION = '2012-11-05',
  AWS_REGION = 'us-east-1',
  AWS_SQS_ACCESS_KEY_ID = 'abc123',
  AWS_SQS_SECRET_ACCESS_KEY = 's3cr3t',
  AWS_SQS_QUEUE_URL
} = process.env;

AWS.config.update({
  accessKeyId: AWS_SQS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SQS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

const sqs = new AWS.SQS({ apiVersion: AWS_API_VERSION });

const removeFromSqs = ({
  ReceiptHandle = '', // required
  QueueUrl = AWS_SQS_QUEUE_URL
} = {}) => {
  return new Promise((resolve, reject) => {
    if (!ReceiptHandle) {
      return reject({ message: 'missing ReceiptHandle' });
    }

    const handleDelete = (err, data) => {
      if (err) {
        return reject({ message: err });
      }
      resolve(data);
    };

    try {
      sqs.deleteMessage({ QueueUrl, ReceiptHandle }, handleDelete);
    } catch(e) {
      reject({ message: 'unable to delete message', data: e });
    }
  });
};

module.exports = { removeFromSqs };
