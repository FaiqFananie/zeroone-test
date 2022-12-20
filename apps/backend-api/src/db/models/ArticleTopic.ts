/* eslint-disable @typescript-eslint/no-empty-interface */
import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../Postgres'
import Article from './Article';
import Topic from './Topic';

interface ArticleTopicAttributes {
  id: string;
  ArticleId: string;
  TopicId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type ArticleTopicInput = Optional<ArticleTopicAttributes, 'id' | 'ArticleId' | 'TopicId'>

class ArticleTopic extends Model<ArticleTopicAttributes, ArticleTopicInput> implements ArticleTopicAttributes {
  public id!: string
  public ArticleId!: string
  public TopicId!: string

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ArticleTopic.init({
  id: {
    type: DataTypes.STRING,
    autoIncrement: true,
    primaryKey: true,
  },
  ArticleId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Article,
      key: 'id'
    }
  },
  TopicId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Topic,
      key: 'id'
    }
  },
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  tableName: 'articles_topics'
})

Article.belongsToMany(Topic, { through: ArticleTopic });
Topic.belongsToMany(Article, { through: ArticleTopic });

export default ArticleTopic