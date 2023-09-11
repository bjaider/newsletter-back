import request from 'supertest'
import app from '../../app.js'

describe('Users tests', () => {
  const params = {
    APIKey: 'I5eYSH1voCZ5dzTYuXfYtC9WfEBMiIhoISETdhLjsOXjetVcrLaAzLwLOLY9Sy5F',
    SecretKey:
      'qeIgzvoNYL3Gt0TNHgKOzhzMkdLsrCiw2AlP0ZCbJk8UZCeoHeWYmPvTqKoqPJaM',
  }
  test('should return an UID', async () => {
    const response = await request(app).post('/api/user/').send(params)
    expect(response._body.uid).toBeDefined()
  })

  test('should return a 200 status code', async () => {
    const {
      _body: {uid},
    } = await request(app).get('/api/user/').query(params).send()
    const response = await request(app).get(`/api/user/userInfo/${uid}`).send()
    console.log(response)
    expect(response.statusCode).toBe(200)
  })
})
