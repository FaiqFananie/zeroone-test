import { FastifyReply, FastifyRequest } from "fastify"
import ClientError from "../exceptions/ClientError"
import ArticleTopicService from "../services/ArticleTopicService"
import TopicService from "../services/TopicService"

class TopicController {
  create = async (req: FastifyRequest<{ Body: { name: string}}>, res: FastifyReply): Promise<FastifyReply> => {
    try {
      if (!req.body || !req.body.name) {
        throw new ClientError('Name Is Required')
      }

      const topicService = new TopicService(req.body, null)
      const idTopic = await topicService.addTopic()

      return res.code(201).send({
        status: 'Success',
        message: 'Topic Is Successfully Created',
        data: {
          id: idTopic
        }
      })
    } catch(error) {
      if (error instanceof ClientError) {
        return res.code(error.statusCode).send({
          status: 'Fail',
          message: error.message,
        });
      } else {
        return res.code(500).send({
          status: 'Fail',
          message: 'Internal Server Error',
        });
      }
    }
  }

  getAll = async (req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> => {
    const topicService = new TopicService(null, null)

    const data = await topicService.getAllTopic()

    return res.code(200).send({
      status: 'Success',
      data: {
        data
      }
    })
  }

  getById = async (req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply): Promise<FastifyReply> => {
    try {
      const topicService = new TopicService(null, req.params.id)

      const data = await topicService.getTopicById()

      return res.code(200).send({
        status: 'Success',
        data: {
          data
        }
      })
    } catch(error) {
      if (error instanceof ClientError) {
        return res.code(error.statusCode).send({
          status: 'Fail',
          message: error.message,
        });
      } else {
        return res.code(500).send({
          status: 'Fail',
          message: 'Internal Server Error',
        });
      }
    }
  }

  update = async (req: FastifyRequest<{ Body: { name: string }, Params: { id: string } }>, res: FastifyReply): Promise<FastifyReply> => {
    try {
      const topicService = new TopicService(req.body, req.params.id)

      await topicService.updateTopic()

      return res.code(200).send({
        status: 'Success',
        message: 'Topic Is Successfully Updated'
      })
    } catch(error) {
      if (error instanceof ClientError) {
        return res.code(error.statusCode).send({
          status: 'Fail',
          message: error.message,
        });
      } else {
        return res.code(500).send({
          status: 'Fail',
          message: 'Internal Server Error',
        });
      }
    }
  }

  delete = async (req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply): Promise<FastifyReply> => {
    try {
      const topicService = new TopicService(null, req.params.id)
      const articleTopicService = new ArticleTopicService(null, req.params.id)

      await topicService.deleteTopic()
      await articleTopicService.deleteByTopic()

      return res.code(200).send({
        status: 'Success',
        message: 'Topic Is Successfully Deleted'
      })
    } catch (error) {
      if (error instanceof ClientError) {
        return res.code(error.statusCode).send({
          status: 'Fail',
          message: error.message,
        });
      } else {
        return res.code(500).send({
          status: 'Fail',
          message: 'Internal Server Error',
        });
      }
    }
  }
}

export default TopicController