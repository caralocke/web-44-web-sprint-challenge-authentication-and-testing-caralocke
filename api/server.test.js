const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')

test('sanity', () => {
  expect(true).toBe(true)
})

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

afterAll(async () => {
  await db.destroy()
})

describe('[POST] /api/auth/register', () => {
  it('returns a 201 OK status', async () => {
    const res = await request(server).post('/api/auth/register').send({ username: 'test', password: '1234' })
    expect(res.status).toBe(201)
  })

  it('responds with a 422 if no username or password in payload', async () => {
    const res = await request(server).post('/api/auth/register').send({ username: '', password: '' })
    expect(res.status).toBe(422)
  })

  it('responds with the newly registered user', async () => {
    let res = await request(server).post('/api/auth/register').send({ username: 'test2', password: '1234' })
    expect(res.body).toMatchObject({ id: 2, username: 'test2'})
  })
})

describe('[POST] /api/auth/login', () => {

})

describe('[GET] /api/jokes', () => {

})