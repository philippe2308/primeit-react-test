import React from 'react';
import './styles.css';

export const CardVehicle = (props) =>
  {
    console.log(props);
    const item=props.item;
    return(
    <div className="container">
      <div className='image'>
        {<img src={'./../../../'+item.media[0].url}/>}
      </div>
      <div className="info">
        <div className="title">
          {item.id}
        </div>
        <div className="price">
          From {item.price}
        </div>
        <div className="description">
          {item.description}
        </div>
      </div>
    </div>
    );
  }
