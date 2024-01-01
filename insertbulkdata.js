const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'd_app',
    password:"1234"
  });



let createRandomUser = ()=>{
    return [
        faker.string.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
    //   avatar: faker.image.avatar(),
        faker.internet.password(),
    //   birthdate: faker.date.birthdate(),
    //   registeredAt: faker.date.past(),
    ];
  }

  let query = `INSERT INTO user(id,username,email,password) VALUES ?`;

  let data = [];
  for(let i = 1;i<=100;i++){
    data.push(createRandomUser());
  }
console.log(data);
connection.query(query,[data],(err,res)=>{
    if(err) throw err;
    console.log(res);
});  