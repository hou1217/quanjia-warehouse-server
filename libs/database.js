const mysql=require('mysql');
const co=require('co-mysql');

let conn=mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'quanjia'
});
let db=co(conn);

module.exports=db
