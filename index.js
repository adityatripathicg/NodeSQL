const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');


const connnection = mysql.createConnection({
  host : 'localhost',
  user:'root',
  database:'test'
})

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
console.log(GetRandomUser());