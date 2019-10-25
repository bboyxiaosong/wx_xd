var API = require('./api.js')
var NETWORK = require('./network.js')
/**
 * 解析腾讯云获取的用户信息
 */
function parseProfile(userProfileItem) {
  var to_account = userProfileItem.To_Account;

  var nick = null, gender = null, allowType = null, imageUrl = null;
  for (var j in userProfileItem.ProfileItem) {
    switch (userProfileItem.ProfileItem[j].Tag) {
      case 'Tag_Profile_IM_Nick':
        nick = userProfileItem.ProfileItem[j].Value;
        break;
      case 'Tag_Profile_IM_Gender':
        switch (userProfileItem.ProfileItem[j].Value) {
          case 'Gender_Type_Male':
            gender = 1;
            break;
          case 'Gender_Type_Female':
            gender = 2;
            break;
          case 'Gender_Type_Unknown':
            break;
        }
        break;
      case 'Tag_Profile_IM_Image':
        imageUrl = userProfileItem.ProfileItem[j].Value;
        break;
    }
  }

  return {
    id: parseInt(to_account),
    nickname: nick,
    gender: gender,
    avatar: imageUrl
  }
}

module.exports = {
  parseProfile: parseProfile
}
