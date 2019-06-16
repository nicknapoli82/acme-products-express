import React from 'react';

export default function Products(props) {
  const {removeProduct, products} = props;
  return (
    <div>
      <h2>Products ({products.length})</h2>
      <ul>
        {
          products.map((p)=>
                       <li key={p.id}>{p.name}
                         <button id={p.id} onClick={()=>removeProduct(p.id)}>Destroy
                         </button>
                       </li>)
        }
      </ul>
    </div>
  );
}
