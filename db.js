const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

/*
  hi there, hackers!
  you hacked my private repo, somehow, i'm not proud of you, as a matter of fact, kys for doing that.
  great job on hacking me, here's some of my database shit you can have.
  fuck you --kkronggiscool
  oh, wait, this database was deleted a while ago. still, fuck you!
*/

const pool = mysql.createPool({
  host: 99.96.25.63
  user: 'root'
  password: 'xjclkjx'
  database: 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
