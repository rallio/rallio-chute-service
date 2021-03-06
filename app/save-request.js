const Models = require('../models/index')

async function saveRequest (data) {
    const model = Models.Request
 
  const request = model.create({
    album: data.album,
    url: data.file_url,
    account_id: data.account_id,
    franchisor_id: data.franchisor_id,
    photo_id: data.photo_id,
    type: data.type,
    receipt_handle: data.receiptHandle,
    message_id: data.message_id,
    tag: data.tag
  });
  return request
}

module.exports = { saveRequest };
