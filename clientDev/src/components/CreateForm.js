import React from 'react';

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
  onSubmit() {
    //TODO
    location.hash = '/products';
  }
  
  render() {
    return (
      <div>
        <h2>Create A Product</h2>
        <div>
          <form action='POST'>
            <input type='text' name='name' value={this.state.productName} onChange={this.onChange}/>
            <button>Save</button>
          </form>
        </div>
      </div>    
    );
  }
}
