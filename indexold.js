const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');


const connection = mysql.createConnection({
  host : 'localhost',
  user:'root',
  database:'D_APP',
  password : '1234' // mysql@123
});
//sql injected
let query = "SHOW TABLES";
connection.query(query, (err,res)=>{
  try {
    if (err) throw err;
    console.log(res);
    console.log(res.length);
  } catch (error) {
    console.log(err);
  }
});

connection.end();


let GetRandomUser = () => {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    //avatar: faker.image.avatar(),
    password: faker.internet.password(),
    //birthdate: faker.date.birthdate(),
    //registeredAt: faker.date.past(),
  };
}
//console.log(GetRandomUser());