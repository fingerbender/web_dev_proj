import React from 'react';
//import {useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./InventoryItem.css";
import ProductDetail from './ProductDetail';

function InventoryItem(props) {
    //console.log("item: ", props.item);
    //console.log("test delete func: ", typeof(props.delItem) === 'function');

    //const navigate = useNavigate();

    //need local handler, else the button auto clicks at page load
    const handleDelete = (event) => {
        event.preventDefault();
        props.delItem(props.item.SKU);
    }

    // const images = require.context('./pic', true);
    // const imageList = images.keys().map(image => images(image));
    // console.log("img",imageList);

    return (
        <div className='itemBlock'>

            {/*table rows from JSON, 1 row at a time. */}
            <h4>{props.item.name}</h4>
            <img src={props.item.image} alt={"image of " + props.item.name}></img>
            <p>SKU: {props.item.SKU}</p>

            <p>Quantity: {props.item.qty}</p>
            <p>Price: ${props.item.price}</p>
            <Link
                to={'/edit/' + props.item.SKU}
                element={<ProductDetail />}>
                <button>Details</button>
            </Link>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default InventoryItem;