const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const root = path.join(__dirname);


app.use(express.urlencoded({ extended: false }));

let products;
readFile('./products.json')
  .then(result => products = result)
  .catch(() => []);

// The limit on changes is 10 to trigger a file write
const LIMIT = 10;
let productsChangeLimit = 0;

app.use('/public', express.static(path.join(root, 'public')));

app.get('/', (req, res, next) => {
  res.sendFile('index.html', {root: root});
});

app.get('/api/products', (req, res, next) => {
  res.send(products);
});

app.post('/api/products', (req, res, next) => {
  let newProduct = { name: req.body.name };
  newProduct.id = seekID();
  console.log(products);
  console.log(newProduct);
  products.push(newProduct);
  productsChangeLimit++;
  if(productsChangeLimit >= LIMIT) {
    writeFile('./products.json')
      .then(productsChangeLimit = 0)
      .catch((e)=> console.log(e));
  }
  res.status(201).send(newProduct);
});

app.delete('/api/products/:id', (req, res, next) => {
  let id = Number(req.params.id);
  let updatedProducts = [];
  for (let i in products) {
    if (products[i].id !== id) {
      updatedProducts.push({ id: products[i].id, name: products[i].name });
    }
  }
  products = updatedProducts;
  productsChangeLimit++;
  if(productsChangeLimit >= LIMIT) {
    writeFile('./products.json')
      .then(productsChangeLimit = 0)
      .catch((e)=> console.log(e));
  }
  res.status(204).send('OK');
});

app.listen(3000);

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data)=>{
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
      return resolve(result);
    });
  });
}

function writeFile(path) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(products), (err, data)=> {
      if (err) {
	return reject(err);
      }
      return resolve();
    });
  });
}

function seekID() {
  let pArr = products.map((p)=> p.id).sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    else return 0;
  });
  let counter = 0;
  while (counter < pArr.length) {
    if (counter in pArr) {
      counter++;
      continue;
    }
    else return counter;
  }
  return ++counter;
}
