import server from '../../createServer'
import Article from '../../db/models/Article'
import Topic from '../../db/models/Topic'
import TopicService from '../../services/TopicService'

describe('A HTTP Server', () => {
  afterAll(async () => {
    await Article.destroy({ truncate: true })
    await Topic.destroy({ truncate: true })
  })

  let id: string
  describe('when POST /api/article', () => {
    it('should respond with status 201', async () => {

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/api/article`,
        payload: {
          title: 'New Title',
          body: 'new Body',
          status: 'published'
        }
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      id = responseJson.data.id
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('Success');
      expect(responseJson.message).toEqual('Article Is Successfully Created');
      expect(responseJson.data).toHaveProperty('id');

    })
  })

  describe('when POST /api/article with topic relation', () => {
    it('should respond with status 201', async () => {

      // Arrange
      const req = {
        body: {
          name: 'Programme'
        },
      }

      const topicService = new TopicService(req.body)
      const topicId = await topicService.addTopic()

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/api/article`,
        payload: {
          title: 'New Title',
          body: 'new Body',
          status: 'published',
          topic: [topicId]
        }
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      id = responseJson.data.id
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('Success');
      expect(responseJson.message).toEqual('Article Is Successfully Created');
      expect(responseJson.data).toHaveProperty('id');

    })
  })

  describe('when POST /api/article with wrong payload', () => {
    it('should respond with status 400', async () => {

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/api/article`,
        payload: {
          body: 'new Body',
          status: 'published'
        }
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('Fail');
      expect(responseJson).toHaveProperty('message');

    })
  })

  describe('when PUT /api/article/:id', () => {
    it('should respond with status 200', async () => {

      // Action
      const response = await server.inject({
        method: 'PUT',
        url: `/api/article/${id}`,
        payload: {
          title: 'New Title1',
          body: 'new Body1',
          status: 'published1'
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('Success');
      expect(responseJson.message).toEqual('Article Is Successfully Updated');
    })
  })

  describe('when PUT /api/article/:id not found ID', () => {
    it('should respond with status 404', async () => {

      // Action
      const response = await server.inject({
        method: 'PUT',
        url: `/api/article/1234`,
        payload: {
          title: 'New Title1',
          body: 'new Body1',
          status: 'published1'
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('Fail');
      expect(responseJson.message).toEqual('Article Is Fail To Update, Article Is Not Found');
    })
  })

  describe('when GET /api/article', () => {

    it('should respond with Article List', async () => {
      
      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/api/article`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('Success');
      expect(typeof responseJson.data).toEqual('object');
    })
  })

  describe('when GET /api/article/:id', () => {
    it('should respond with Article status 200', async () => {

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/api/article/${id}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('Success');
      expect(typeof responseJson.data).toEqual('object');
    })
  })

  describe('when GET /api/article/:id with not found ID', () => {
    it('should respond with Article status 404', async () => {

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/api/article/1234`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('Fail');
      expect(responseJson.message).toEqual('Article Is Not Found');
    })
  })

  describe('when DELETE /api/article/:id', () => {
    it('should respond with Article status 200', async () => {

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/api/article/${id}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('Success');
      expect(responseJson.message).toEqual('Article Is Successfully Deleted');
    })
  })

  describe('when DELETE /api/article/:id with not found ID', () => {
    it('should respond with Article status 404', async () => {

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/api/article/1234`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('Fail');
      expect(responseJson.message).toEqual('Article Is Fail To Delete, Article Is Not Found');
    })
  })
})