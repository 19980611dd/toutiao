import request from '@/utils/request.js'
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
// 获取所有频道数据
export const fetchAllCitys = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}
export const fetchAllCity = (channel) => {
  return request({
    method: 'PATCH',
    url: 'v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}
export const deleteUserChannel = (channelId) => {
  return request({
    method: 'DELETE',
    url: `v1_0/user/channels/${channelId}`
  })
}
