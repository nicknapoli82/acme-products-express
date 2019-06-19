import React from 'react';
import axios from 'axios';
import querystring from 'querystring';

export default class CreateForm extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);    
    this.state = { productName: '' };
  }

  onChange(ev) {
    this.setState({ productName: ev.target.value});
  }

  // The question is... Do I even need this?
  onSubmit(e) {
    e.preventDefault();
    const p = { name: this.state.productName };
    axios.post('/api/products', querystring.stringify(p))
         .then(r => {
           if (r.status !== Number(201)) throw "Product creation failed";
           this.props.addProduct(r.data);
         })
         .catch((e) => {
           console.log(e);
         });
    location.hash = '/products';
  }
  
  render() {
    return (
      <div>
        <h2>Create A Product</h2>
        <div>
          <form method='POST' action='/products' onSubmit={this.onSubmit}>
            <input type='text' name='name' value={this.state.productName} onChange={this.onChange}/>
            <button>Save</button>
          </form>
        </div>
      </div>    
    );
  }
}
