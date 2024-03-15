const express = require('express')
const mysql = require('mysql')
require('dotenv').config()

const app = express()

app.use(express.json())

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT

})

db.connect((err)=> {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });

app.listen(8080, ()=>{
    console.log('server is running on port 8080')
})