import { nanoid } from "nanoid"
import ClientError from "../exceptions/ClientError"
import NotFoundError from "../exceptions/NotFoundError"
import Topic from "../db/models/Topic"

class TopicService {
  private body:  {
    name: string
  }

  private params = ''

  constructor(body?: { name: string}, params?: string) {
    this.body = body
    this.params = params
  }

  addTopic = async (): Promise<string> => {
    const id = `topic-${nanoid(16)}`

    const data = await Topic.create({
      id,
      name: this.body.name
    }).catch((error) => {
      throw new ClientError(error.message)
    })

    return data.id
  } 

  getAllTopic = async ():Promise<object> => {
    const data = await Topic.findAll({where: {deletedAt: null}})

    return data
  }

  getTopicById = async ():Promise<object> => {
    const data = await Topic.findByPk(this.params, { paranoid: false }).catch((error) => {
      throw new ClientError(error.message)
    })

    if(!data) {
      throw new NotFoundError('Topic Is Not Found')
    }
    
    return data
  }

  updateTopic = async(): Promise<object> => {
    const data = await Topic.update({
      name: this.body.name
    }, { where: { id: this.params } }).catch((error) => {
      throw new ClientError(error.message)
    })

    if(data[0] === 0) {
      throw new NotFoundError('Topic Is Fail To Update, Topic Is Not Found');
    }

    return data
  }

  deleteTopic = async(): Promise<number> => {
    const data = await Topic.destroy({ where: { id: this.params } }).catch((error) => {
      throw new ClientError(error.message)
    })

    if(data === 0) {
      throw new NotFoundError('Topic Is Fail To Delete, Topic Is Not Found')
    }

    return data
  }
}

export default TopicService