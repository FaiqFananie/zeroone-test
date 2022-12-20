import Topic from '../../db/models/Topic';
import TopicService from '../TopicService'

let id: string
describe('Topic Service Test', () => {
  describe('A TopicService Class', () => {
    it('Should containts add, getAll, getById, update and delete function', () => {
      //arrange
      const topicService = new TopicService()


      expect(topicService).toHaveProperty('addTopic');
      expect(topicService).toHaveProperty('getAllTopic');
      expect(topicService).toHaveProperty('getTopicById');
      expect(topicService).toHaveProperty('updateTopic');
      expect(topicService).toHaveProperty('deleteTopic');
      expect(topicService.addTopic).toBeInstanceOf(Function);
      expect(topicService.getAllTopic).toBeInstanceOf(Function);
      expect(topicService.getTopicById).toBeInstanceOf(Function);
      expect(topicService.updateTopic).toBeInstanceOf(Function);
      expect(topicService.deleteTopic).toBeInstanceOf(Function);
    });
  })

  describe('when add new topic', () => {
    it('should respond with new topic ID', async () => {
      // Arrange 
      const req = {
        body: {
          name: 'Programme'
        },
      }

      const topicService = new TopicService(req.body)

      // Action
      const data = await topicService.addTopic()
      id = data

      // Assert
      expect(typeof data).toEqual('string');
    })
  })

  describe('when get all topic', () => {
    it('should respond with list topic', async () => {
      // Arrange 
      const topicService = new TopicService()

      // Action
      const data = await topicService.getAllTopic()

      // Assert
      expect(typeof data).toEqual('object');
      expect(data[0]).toHaveProperty('id')
      expect(data[0]).toHaveProperty('name')
    })
  })

  describe('when get topic by id', () => {
    it('should respond with topic that have same id', async () => {
      // Arrange 
      const topicService = new TopicService(null, id)

      // Action
      const data = await topicService.getTopicById()

      // Assert
      expect(typeof data).toEqual('object');
      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('name');
    })
  })

  describe('when update an topic', () => {
    it('should respond with total affected rows', async () => {
      // Arrange 
      const req = {
        body: {
          name: 'Technology'
        },
      }

      const topicService = new TopicService(req.body, id)

      // Action
      const data = await topicService.updateTopic()

      // Assert
      expect(data[0]).toBeGreaterThan(0)
    })

    it('should throw error if ID is not found', async () => {
      // Arrange 
      const req = {
        body: {
          name: 'Technology'
        },
      }

      const topicService = new TopicService(req.body, '999')

      // Action & Assert
      try {
        await topicService.updateTopic()
      } catch (error) {
        expect(error.statusCode).toEqual(404)
        expect(error.name).toEqual('NotFoundError')
        expect(error.message).toEqual('Topic Is Fail To Update, Topic Is Not Found')
      }
    })
  })

  describe('when delete an topic', () => {
    afterAll(async () => {
      await Topic.destroy({ truncate: true })
    })

    it('should respond with total affected rows', async () => {
      // Arrange 
      const topicService = new TopicService(null, id)

      // Action
      const data = await topicService.deleteTopic()

      // Assert
      expect(data).toBeGreaterThan(0)
    })

    it('should throw error if ID is not found', async () => {
      // Arrange
      const topicService = new TopicService(null, '999')

      // Action & Assert
      try {
        await topicService.deleteTopic()
      } catch (error) {
        expect(error.statusCode).toEqual(404)
        expect(error.name).toEqual('NotFoundError')
        expect(error.message).toEqual('Topic Is Fail To Delete, Topic Is Not Found')
      }
    })
  })
})