/* eslint-disable @typescript-eslint/no-empty-interface */
import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../Postgres'

interface TopicAttributes {
  id: string;
  name: string;
  deletedAt?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type TopicInput = Optional<TopicAttributes, 'id' | 'name'>

class Topic extends Model<TopicAttributes, TopicInput> implements TopicAttributes {
  public id!: string
  public name!: string
  public deletedAt!: string

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Topic.init({
  id: {
    type: DataTypes.STRING,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  paranoid: true,
  tableName: 'topics'
})

export default Topic