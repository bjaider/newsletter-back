import request from 'supertest'
import app from '../../app.js'

describe('Currencies tests', () => {
  test('should return a 200 status code', async () => {
    const response = await request(app).get('/api/currencies/loseValue').send()
    expect(response.statusCode).toBe(200)
  })

  test('should return a array with 10 elements', async () => {
    const response = await request(app).get('/api/currencies/loseValue').send()
    expect(response._body.length).toBe(10)
  })
})
