import request from '@/utils/request.js'
export const getSearchSuggestion = (q) => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
export function getSearch(params) {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
