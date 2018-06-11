//let Db = require('mongodb').Db;
//let Server = require('mongodb').Server;

let faker = require('faker');
let _ = require('lodash');
let GENRES = require('./src/constants');

//let db = new Db('Artists', new Server('localhost', 27017));
let mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/Artists");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log("Connection opened up for node !!!");
  createBulkRequest();
});


let artistsCollection;
const MINIMUM_ARTISTS = 2000;
const ARTISTS_TO_ADD =  1;

function createBulkRequest() {
//console.log(' createBulkRequest started !!! ');

  artistsCollection = db.collection('artists');
  return artistsCollection.count({})

    .then(count => {
      if (count < MINIMUM_ARTISTS) {
        const artists = _.times(ARTISTS_TO_ADD, () => createArtist());

        artistsCollection.insertMany(artists);
      }
    })
    .catch(e => console.log(e));
  }

function createArtist() {
  return {
    name: faker.name.findName(),
    age: randomBetween(15, 45),
    yearsActive: randomBetween(0, 15),
    image: faker.image.avatar(),
    genre: getGenre(),
    website: faker.internet.url(),
    netWorth: randomBetween(0, 5000000),
    labelName: faker.company.companyName(),
    retired: faker.random.boolean(),
    albums: getAlbums()
  };
}

function getAlbums() {
  return _.times(randomBetween(0, 5), () => {
    const copiesSold = randomBetween(0, 1000000);

    return {
      title: _.capitalize(faker.random.words()),
      date: faker.date.past(),
      copiesSold,
      numberTracks: randomBetween(1, 20),
      image: getAlbumImage(),
      revenue: copiesSold * 12.99
    };
  });
}

function getAlbumImage() {
  const types = _.keys(faker.image);
  console.log(' Inside get album image , types is ', types);
  const method = randomEntry(types);
  console.log(' Inside get album image , method is ', method);
  return faker.image[method]();
}

function getGenre() {
  return randomEntry(GENRES);
}

function randomEntry(array) {
  return array[~~(Math.random() * array.length)];
}

function randomBetween(min, max) {
  return ~~(Math.random() * (max - min)) + min;
}