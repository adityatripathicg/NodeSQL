//importing libraries
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

let RandomUser = function(){
  return {
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    //avatar: faker.image.avatar(),
    password: faker.internet.password(),
    //birthdate: faker.date.birthdate(),
    //registeredAt: faker.date.past(),
  };
} 

//creating connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'D_APP',
    password: "1234"
  });

 //inserting new data 
let query = "INSERT INTO user (id, username, email, password) VALUES ?";
let user = ["123","username1","user@gmail.com","pass@123"];
try {
    connection.query(query,RandomUser(),(err, results) => {
            if(err) throw err;
            console.log(results);
            console.log(results.length);
        }
      );    
}
catch (err) {
    console.log(err);
}
connection.end();
 