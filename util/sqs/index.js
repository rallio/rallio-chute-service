const AWS = require('aws-sdk');
require('dotenv').config();

const {
  AWS_API_VERSION = '2012-11-05',
  AWS_REGION = 'us-east-1',
  AWS_SQS_ACCESS_KEY_ID = 'abc123',
  AWS_SQS_SECRET_ACCESS_KEY = 's3cr3t',
} = process.env;

const sqs = ({ endpoint } = {}) => {
  AWS.config.update({
    accessKeyId: AWS_SQS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SQS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
  });

  return new AWS.SQS({
    apiVersion: AWS_API_VERSION,
    ...(endpoint && { endpoint })
  });
}

module.exports = {
  sqs
};