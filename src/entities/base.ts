import database from '../db_config'

export default class BaseModel {

  static entity: any;
  static table: string;

  static getConnection () {
    return database;
  }

  save () {
    console.log(this)
  }
}