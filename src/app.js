let express = require('express');
let app = express();
let router = express.Router();
let faker = require('faker');

app.use('/faker' , (req, res) => {
//creating a faker user and returning back

const User = {
  name:faker.name.findName(),
  mail: faker.internet.email(),
  website: faker.internet.url(),
  address: faker.address.streetAddress() + faker.address.city() + faker.address.country(),
  bio: faker.lorem.sentences(),
  image: faker.image.avatar()
}

  res.status(200).send(User);
})
module.exports = app;
