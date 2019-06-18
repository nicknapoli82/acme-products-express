import React from 'react';
import {Link, NavLink} from 'react-router-dom';

export default function NavSection(props) {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/products">Products({props.products.length})</NavLink>
      <NavLink to="/createproduct">Create A Product</NavLink>
    </div>
  );
}
