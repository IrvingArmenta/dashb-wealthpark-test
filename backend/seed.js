"use strict";

const Spinner = require('cli-spinner').Spinner;
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcryptjs');
const faker = require('faker');


const mongoDBoptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

Spinner.setDefaultSpinnerString(20);

const Spin = new Spinner('Generating users... %s');

// this is to avoid duplicates
faker.seed(123);

function seedDB() {
  MongoClient.connect('mongodb://localhost/dashb', mongoDBoptions, (err, db) => {
    if (err) throw err;

    let dbo = db.db('dashb');

  Spin.start();
    const fakeArr = new Array(64).fill(null)
                       .map((e, i) => e = faker.name.firstName())

    fakeArr.push('Admin');

    const names = fakeArr;
    
    const usersArr = names.map(async (name) => {

      // passing encrypted password 
      let password = `password-${name.toLowerCase()}`;
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      if (name === 'Admin') {
        return {
          name,
          email: `${name.toLowerCase()}@email.com`,
          role: 'admin',
          password
        }
      } else {
        return {
          name,
          email: `${name.toLowerCase()}@email.com`,
          role: 'user',
          password,
        }
      }
      
    });


    // Populating DB with the new users
    Promise.all(usersArr).then((newUsers) => {
      // cleaning the collection
      dbo.collection("users").deleteMany({}, (err, res) => {
        if (err) throw err;
        console.log("* ---- users cleared! ---- *");
        // close the connection to db when you are done with it
        db.close();
      });
      
      // populating the collection
      dbo.collection("users").insertMany(newUsers, (err, res) => {
        if (err) throw err;
        console.log("* ---- users inserted! ---- *");
        // close the connection to db when you are done with it
        db.close();
      });

      Spin.stop();
    });
 
  });
  
}

seedDB();
