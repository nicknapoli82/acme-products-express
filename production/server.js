const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const root = path.join(__dirname);

let products;
readFile('./products.json')
  .then(result => products = result)
  .catch(() => []);

console.log(products);

app.use('/public', express.static(path.join(root, 'public')));

app.get('/', (req, res, next) => {
  console.log(products[0]);
  res.sendFile('index.html', {root: root});
});

app.get('/api/products', (req, res, next) => {
  res.send(products);
});

app.listen(3000);

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile('./products.json', (err, data)=>{
      if (err) {
	return reject(err);
      }
      
      let result;
      try {
	result = JSON.parse(data);
      }
      catch (e){
	return reject(e);
      }
      console.log(result);
      return resolve(result);
    });
  });
}
