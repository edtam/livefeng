import axios from 'axios'

export const request = axios.create({
  baseURL: 'https://m.fengshows.com',
  headers: {
    'fengshows-client': 'app(android,5020201);Meizu 16 X;27',
  },
})
