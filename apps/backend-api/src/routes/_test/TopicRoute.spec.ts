import server from '../../createServer'
import Topic from '../../db/models/Topic'

describe('A HTTP Server', () => {
  afterAll(async () => {
    await Topic.destroy({ truncate: true })
  })

  let id: string
  describe('when POST /api/topic', () => {
    it('should respond with status 201', async () => {

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/api/topic`,
        payload: {
          name: 'New Topic',
        }
      })

      // Assert
      const responseJson = JSON.parse(response.payload)
      id = responseJson.data.id
      expect(response.statusCode).toEqual(201)
      expect(responseJson.status).toEqual('Success')
      expect(responseJson.message).toEqual('Topic Is Successfully Created')
      expect(responseJson.data).toHaveProperty('id')

    })
  })

  describe('when POST /api/topic with wrong payload', () => {
    it('should respond with status 400', async () => {

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/api/topic`,
      })

      // Assert
      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJson.status).toEqual('Fail')
      expect(responseJson).toHaveProperty('message')

    })
  })

  describe('when PUT /api/topic/:id', () => {
    it('should respond with status 200', async () => {

      // Action
      const response = await server.inject({
        method: 'PUT',
        url: `/api/topic/${id}`,
        payload: {
          name: 'New Topic2',
        },
      })

      // Assert
      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(200)
      expect(responseJson.status).toEqual('Success')
      expect(responseJson.message).toEqual('Topic Is Successfully Updated')
    })
  })

  describe('when PUT /api/topic/:id not found ID', () => {
    it('should respond with status 404', async () => {

      // Action
      const response = await server.inject({
        method: 'PUT',
        url: `/api/topic/1234`,
        payload: {
          name: 'New Topic2',
        },
      })

      // Assert
      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(404)
      expect(responseJson.status).toEqual('Fail')
      expect(responseJson.message).toEqual('Topic Is Fail To Update, Topic Is Not Found')
    })
  })

  describe('when GET /api/topic', () => {

    it('should respond with Topic List', async () => {

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/api/topic`,
      })

      // Assert
      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(200)
      expect(responseJson.status).toEqual('Success')
      expect(typeof responseJson.data).toEqual('object')
    })
  })

  describe('when GET /api/topic/:id', () => {
    it('should respond with topic status 200', async () => {

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/api/topic/${id}`,
      })

      // Assert
      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(200)
      expect(responseJson.status).toEqual('Success')
      expect(typeof responseJson.data).toEqual('object')
    })
  })

  describe('when GET /api/topic/:id with not found ID', () => {
    it('should respond with Topic status 404', async () => {

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/api/topic/1234`,
      })

      // Assert
      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(404)
      expect(responseJson.status).toEqual('Fail')
      expect(responseJson.message).toEqual('Topic Is Not Found')
    })
  })

  describe('when DELETE /api/topic/:id', () => {
    it('should respond with Topic status 200', async () => {

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/api/topic/${id}`,
      })

      // Assert
      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(200)
      expect(responseJson.status).toEqual('Success')
      expect(responseJson.message).toEqual('Topic Is Successfully Deleted')
    })
  })

  describe('when DELETE /api/topic/:id with not found ID', () => {
    it('should respond with Topic status 404', async () => {

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/api/topic/1234`,
      })

      // Assert
      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(404)
      expect(responseJson.status).toEqual('Fail')
      expect(responseJson.message).toEqual('Topic Is Fail To Delete, Topic Is Not Found')
    })
  })
})