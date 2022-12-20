/* eslint-disable @typescript-eslint/no-empty-interface */
import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../Postgres'

interface ArticleAttributes {
  id: string;
  title: string;
  body: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type ArticleInput = Optional<ArticleAttributes, 'id' | 'title' | 'body' | 'status'>

class Article extends Model<ArticleAttributes, ArticleInput> implements ArticleAttributes {
    public id!: string
    public title!: string
    public body!: string
    public status!: string
    public readonly Topics!: object;
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  Article.init({
    id: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  }, {
    timestamps: true,
    sequelize: sequelizeConnection,
    tableName: 'articles'
  })
  
  export default Article