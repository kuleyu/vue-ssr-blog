import axios from 'axios'

const weatherApi = 'https://www.sojson.com/open/api/weather/json.shtml?city='
export function fetchItem(city = '杭州') {
  console.log('fetchItem')
  return axios.get(weatherApi + encodeURIComponent(city))
}