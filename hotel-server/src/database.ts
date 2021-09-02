import keys from './keys'

const mysql = require('mysql');
const mysqlConnection = mysql.createConnection(keys.database);

mysqlConnection.connect((err: any) => {
  if (err){
      throw(err);
  }
  console.log('DB is connected');
});

module.exports = mysqlConnection;