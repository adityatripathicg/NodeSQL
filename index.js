const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const methodOverride = require("method-override");
const app = express();
const port = 8080;
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.use(express.urlencoded(({extended:true})));
const path = require('path');
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));


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

//   let query = `INSERT INTO user(id,username,email,password) VALUES ?`;

//   let data = [];
//   for(let i = 1;i<=100;i++){
//     data.push(createRandomUser());
//   }
// console.log(data);
// connection.query(query,[data],(err,res)=>{
//     if(err) throw err;
//     console.log(res);
// });  

app.get("/",(req,res)=>{
  let q = `SELECT count(*) FROM user`;
  try{
    connection.query(q,(err,result)=>{
      if (err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs",{count});
    });
  }catch{
    res.send("Some Error in DB");
  }
  //res.send("Server On!");
});
app.get("/user",(req,res)=>{
  let q = `SELECT * FROM user`;
  try {
    connection.query(q,(error,result)=>{
      if (error) throw error;
      let datas = result;
      console.log(datas);
      res.render("users.ejs",{datas});
    });
  } catch (error) {
    res.send("Some Error in DB");
  }
});
//edit route
app.get("/user/:id/edit",(req,res)=>{
  let {id} = req.params; 
  //console.log(id);
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try {
    connection.query(q,(error,result)=>{
      if (error) throw error;
      let user = result[0];
      console.log(user);
      res.render("edit.ejs",{user});
    });
  } catch (error) {
    res.send("Some Error in DB");
  }
});
//update route
app.patch("/user/:id",(req,res)=>{
  let {id} = req.params; 
  let {password: formpass, username : newUsername} = req.body;
  //console.log(id); 
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try {
    connection.query(q,(error,result)=>{
      if (error) throw error;
      let user = result[0];
      if(formpass!= user.password){
        res.send("Wrong Password");
      }
      else{
        let q2 = `UPDATE user SET username='${newUsername}' where id='${id}'`;
        connection.query(q2,(err,result)=>{
          if(err) throw err;
          //res.send(result);
          res.redirect("/user");
        });
      }
       //console.log(user);
      //res.send(user);
    });
  } 
  catch (error) {
    res.send("Some Error in DB");
  }
});
//Add Route
app.post("/user",(req,res)=>{
  let {id, username, email, password} = req.body;
  let q = `INSERT INTO user(id, username, email,password) VALUES ('${id}','${username}','${email}','${password}')`;
  try {
    connection.query(q,(err,result)=>{
      if (err) throw err;
      res.redirect("/user");
    });
  } catch (error) {
    res.send("Some Error in DB");
  }
});
app.get("/add",(req,res)=>{
  res.render("add.ejs");
});
app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("del.ejs", { user });
    });
  } catch (err) {
    res.send("some error with DB");
  }
});
//DELETE Route
app.delete("/user/:id/", (req, res) => {
  let { id } = req.params;
  let { password } = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];

      if (user.password != password) {
        res.send("WRONG Password entered!");
      } else {
        let q2 = `DELETE FROM user WHERE id='${id}'`; //Query to Delete
        connection.query(q2, (err, result) => {
          if (err) throw err;
          else {
            console.log(result);
            console.log("deleted!");
            res.redirect("/user");
          }
        });
      }
    });
  } catch (err) {
    res.send("some error with DB");
  }
});
app.listen(port,()=>{
  console.log(`App Listening to port : ${port}`);
});
