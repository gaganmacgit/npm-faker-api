let app = require('./src/app');
let port = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log('server running on port ', port);
})