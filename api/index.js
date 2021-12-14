import { main } from '../lib/main.js'

export default async function handler(request, response) {
  const { name } = request.query
  try {
    const url = await main(name)
    response.redirect(url)
  } catch (error) {
    response.status(400).send(error.message)
  }
}
