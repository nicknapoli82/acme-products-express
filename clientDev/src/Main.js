import React from 'react';
import axios from 'axios';
import {HashRouter as Router, Route} from 'react-router-dom';

import NavSection from './components/NavSection';
import Home from './components/Home';
import Products from './components/Products';
import CreateForm from './components/CreateForm';

const dummyData = [{id: 1, name: "Product 1"}, {id: 2, name: "Product 2"}];

export default class Main extends React.Component {
  constructor() {
    super();
    this.getProducts = this.getProducts.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.state = {
      products: []
    };
  }

  getProducts() {
    axios.get('/api/products').then((products) => this.setState({products: products.data}));
  }
  
  removeProduct(id) {
    const result = this.state.products.filter((p)=> p.id !== Number(id));
    console.log(result);
    this.setState({products: result});
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    return (
      <div>
        <h1>Acme Products</h1>
        <Router>
          <NavSection/>
          <Route path='/' exact component={Home} />
          <Route path='/products' render={()=> <Products products={this.state.products} getProducts={this.getProducts} removeProduct={this.removeProduct} />} />
          <Route path='/createproduct' component={CreateForm}/>
        </Router>
      </div>
    );
  }
}
