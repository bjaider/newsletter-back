import request from 'supertest'
import app from '../../app.js'

describe('Orders tests', () => {
  const params = {
    APIKey: 'I5eYSH1voCZ5dzTYuXfYtC9WfEBMiIhoISETdhLjsOXjetVcrLaAzLwLOLY9Sy5F',
    SecretKey:
      'qeIgzvoNYL3Gt0TNHgKOzhzMkdLsrCiw2AlP0ZCbJk8UZCeoHeWYmPvTqKoqPJaM',
  }

  test('should return a 200 status code', async () => {
    const {
      _body: {uid},
    } = await request(app).get('/api/user/').query(params).send()

    const data = {
      symbol: 'BNBUSDT',
      side: 'BUY',
      type: 'LIMIT',
      price: '100',
      quantity: 1,
      timeInForce: 'GTC',
    }
    const response = await request(app)
      .post(`/api/orders/sendOrder/${uid}`)
      .send(data)
    expect(response.statusCode).toBe(200)
  })
})
