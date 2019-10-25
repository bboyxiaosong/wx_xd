var NETWORK = require('./network.js')
var API = require('./api.js')

/**
 * 私信、留言发短信
 */
function sendPrivateMessage(toUserId) {
  try {
    NETWORK.POST({
      url: API.sendMessage,
      params: {
        'toUserId': toUserId
      }
    })
  }
  catch (e) { }
}

module.exports = {
  sendPrivateMessage: sendPrivateMessage
}
