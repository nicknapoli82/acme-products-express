import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';

import NavSection from './components/NavSection';
import Home from './components/Home';
import Products from './components/Products';
import CreateForm from './components/CreateForm';

const dummyData = [{id: 1, name: "Product 1"}, {id: 2, name: "Product 2"}];

export default class Main extends React.Component {
  constructor() {
    super();
    this.removeProduct = this.removeProduct.bind(this);
    this.state = {
      products: dummyData
    };
  }

  removeProduct(id) {
    const result = this.state.products.filter((p)=> p.id !== Number(id));
    console.log(result);
    this.setState({products: result});
  }
  
  render() {
    return (
      <div>
        <h1>Acme Products</h1>
        <Router>
          <NavSection/>
          <Route path='/' exact component={Home} />
          <Route path='/products' render={()=> <Products products={this.state.products} removeProduct={this.removeProduct} />} />
          <Route path='/createproduct' component={CreateForm}/>
        </Router>
      </div>
    );
  }
}
