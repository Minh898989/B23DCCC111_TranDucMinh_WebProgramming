const mysql =require('mysql2');
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'27082005',
    database:'cuahang'
});
db.connect((err)=>{
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});
module.exports=db;