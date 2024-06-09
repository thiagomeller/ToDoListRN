import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'toDoList'
const SQL_CREATE_TABLE = `CREATE TABLE IF NOT EXISTS ToDoItems (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, checked INTEGER);`

let _db: SQLite.SQLiteDatabase | null = null

const openDB =  () => {
  if(!_db) {
    _db =  SQLite.openDatabaseSync(DATABASE_NAME);

    _db.withTransactionSync( () => {
      _db!.execSync(SQL_CREATE_TABLE);
    });
  }
  return _db
}

export default openDB;