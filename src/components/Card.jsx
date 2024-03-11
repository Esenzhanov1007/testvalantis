import React from 'react'
import './Card.css'
import goldenRing from "../assets/goldenRing3.jpeg"

export default function Card(props) {
  return (
    <div className="card group">
        <img src={goldenRing} height={300} width={400} alt="Product" className="card-img" style={{aspectRatio: 400 / 300, objectFit: "cover"}}/>
        <div className="card-info">
            <a className="card-name" href='#'>
                {props.productName}
            </a>
            <h4 className='card-brand'>
                Brand: {props.brand ? props.brand : "Неизвестно"}
            </h4>
            <h4 className="card-price">
                {props.price}руб.
            </h4>
            <h4 className="card-id-text">
                <span>ID:</span> 
                <span className='card-id'>{props.id}</span>
            </h4>
        </div>
    </div>
  )
}
