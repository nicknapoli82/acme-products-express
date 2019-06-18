import React from 'react';
import axios from 'axios';
import querystring from 'querystring';
import {HashRouter as Router, Route} from 'react-router-dom';

import NavSection from './components/NavSection';
import Home from './components/Home';
import Products from './components/Products';
import CreateForm from './components/CreateForm';

export default class Main extends React.Component {
  constructor() {
    super();
    this.getProducts = this.getProducts.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.state = {
      products: []
    };
  }

  getProducts() {
    axios.get('/api/products').then((products) => this.setState({products: products.data}));
  }

  addProduct(p) {
    this.setState({ products: [...this.state.products, p] });
  }
  
  removeProduct(id) {
    axios.delete(`/api/products/${id}`)
         .then(r => {
           console.log(r);
           if (r.status !== Number(204)) throw "Product deletion failed";
           this.getProducts();
         })
         .catch(e => console.log(e));
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    return (
      <div>
        <h1>Acme Products</h1>
        <Router>
          <NavSection products={this.state.products}/>
          <Route path='/' exact component={Home} />
          <Route path='/products' render={()=> <Products products={this.state.products} getProducts={this.getProducts} removeProduct={this.removeProduct} />} />
          <Route path='/createproduct' render={()=> <CreateForm addProduct={this.addProduct}/>} />
        </Router>
      </div>
    );
  }
}
