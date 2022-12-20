import Article from '../../db/models/Article'
import ArticleTopic from '../../db/models/ArticleTopic'
import Topic from '../../db/models/Topic'
import ArticleService from '../ArticleService'
import ArticleTopicService from '../ArticleTopicService'
import TopicService from '../TopicService'

let id: string
describe('Article Service Test', () => {
  describe('A ArticleService Class', () => {
    it('Should containts add, getAll, getById, update and delete function', () => {
      //arrange
      const articleService = new ArticleService()


      expect(articleService).toHaveProperty('addArticle');
      expect(articleService).toHaveProperty('getAllArticle');
      expect(articleService).toHaveProperty('getArticleById');
      expect(articleService).toHaveProperty('updateArticle');
      expect(articleService).toHaveProperty('deleteArticle');
      expect(articleService.addArticle).toBeInstanceOf(Function);
      expect(articleService.getAllArticle).toBeInstanceOf(Function);
      expect(articleService.getArticleById).toBeInstanceOf(Function);
      expect(articleService.updateArticle).toBeInstanceOf(Function);
      expect(articleService.deleteArticle).toBeInstanceOf(Function);
    });
  })

  describe('when add new article', () => {
    it('should respond with new article ID', async () => {
      // Arrange 
      const req = {
        body: {
          title: 'How to be a good programmer',
          body: 'To become a better programmer, you need to be good at the data structure, algorithms, designing using OOP, multi-threading, and various programming concepts like Recursion, divide and conquer, prototyping, and unit testing.',
          status: 'draft'
        },
      }

      const articleService = new ArticleService(req.body)

      // Action
      const data = await articleService.addArticle()
      id = data

      // Assert
      expect(typeof data).toEqual('string');
    })
  })

  describe('when get all article', () => {
    it('should respond with list article', async () => {
      // Arrange 
      const articleService = new ArticleService(null, null, null)

      // Action
      const data = await articleService.getAllArticle()

      // Assert
      expect(typeof data).toEqual('object')
      expect(data[0]).toHaveProperty('id')
      expect(data[0]).toHaveProperty('title')
      expect(data[0]).toHaveProperty('body')
      expect(data[0]).toHaveProperty('status')
    })
  })

  describe('when get all article by status', () => {
    it('should respond with list article by status', async () => {
      // Arrange 
      const articleService = new ArticleService({title: 'test', body: 'body test', status: 'published'}, null, { status: 'published' })
      await articleService.addArticle()

      // Action
      const data = await articleService.getAllArticle()

      // Assert
      expect(typeof data).toEqual('object');
      expect(data[0].status).toEqual('published');
    })
  })

  describe('when get all article by topic filter', () => {
    it('should respond with list article by topic id filter', async () => {
      // Arrange
      const articleService = new ArticleService({ title: 'test', body: 'body test', status: 'published' }, null, null)
      const topicService = new TopicService({ name: 'test' }, null)
      const article = await articleService.addArticle()
      const topic = await topicService.addTopic()
      const articleTopicService = new ArticleTopicService(article, topic)
      await articleTopicService.addArticleTopic()

      // Action
      const articleService2 = new ArticleService(null, null, { topic })
      const data = await articleService2.getAllArticle()

      // Assert
      expect(typeof data).toEqual('object');
      expect(data[0].Topics[0].id).toEqual(topic);
    })
  })

  describe('when get article by id', () => {
    it('should respond with article that have same id', async () => {
      // Action
      const articleService = new ArticleService(null, id)
      const data = await articleService.getArticleById()

      // Assert
      expect(typeof data).toEqual('object');
      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('title');
      expect(data).toHaveProperty('body');
      expect(data).toHaveProperty('status');
      expect(data).toHaveProperty('updatedAt');
    })

    it('should throw error if ID is not found', async () => {
      // Arrange 
      const articleService = new ArticleService(null, '999')

      // Action & Assert
      try {
        await articleService.getArticleById()
      } catch (error) {
        expect(error.statusCode).toEqual(404)
        expect(error.name).toEqual('NotFoundError')
        expect(error.message).toEqual('Article Is Not Found')
      }
    })
  })

  describe('when update an article', () => {
    it('should respond with total affected rows', async () => {
      // Arrange 
      const req = {
        body: {
          title: 'How to be a good programmer',
          body: 'To become a better programmer, you need to be good at the data structure, algorithms, designing using OOP, multi-threading, and various programming concepts like Recursion, divide and conquer, prototyping, and unit testing.',
          status: 'draft'
        },
      }

      const articleService = new ArticleService(req.body, id)

      // Action
      const data = await articleService.updateArticle()

      // Assert
      expect(data[0]).toBeGreaterThan(0)
    })

    it('should throw error if ID is not found', async () => {
      // Arrange 
      const req = {
        body: {
          title: 'How to be a good programmer',
          body: 'To become a better programmer, you need to be good at the data structure, algorithms, designing using OOP, multi-threading, and various programming concepts like Recursion, divide and conquer, prototyping, and unit testing.',
          status: 'draft'
        },
      }

      const articleService = new ArticleService(req.body, '999')

      // Action & Assert
        try{
          await articleService.updateArticle()
        } catch (error) {
          expect(error.statusCode).toEqual(404)
          expect(error.name).toEqual('NotFoundError')
          expect(error.message).toEqual('Article Is Fail To Update, Article Is Not Found')
        }
    })
  })

  describe('when delete an article', () => {
    afterAll(async () => {
      await Article.destroy({ truncate: true })
      await ArticleTopic.destroy({ truncate: true })
      await Topic.destroy({ truncate: true })
    })
    
    it('should respond with total affected rows', async () => {
      // Arrange 
      const articleService = new ArticleService(null, id)

      // Action
      const data = await articleService.deleteArticle()

      // Assert
      expect(data[0]).toBeGreaterThan(0)
    })

    it('should throw error if ID is not found', async () => {
      // Arrange
      const articleService = new ArticleService(null, '999')

      // Action & Assert
      try {
        await articleService.deleteArticle()
      } catch (error) {
        expect(error.statusCode).toEqual(404)
        expect(error.name).toEqual('NotFoundError')
        expect(error.message).toEqual('Article Is Fail To Delete, Article Is Not Found')
      }
    })
  })
})
