import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./ProductDetail.css";
import InventoryList from './InventoryList';

export default function ProductDetail(props) {

    //grab SKU:string from URL
    let { SKU } = useParams();

    //init
    const goto = useNavigate();

    //console.log("ProductionDetail props:", props);
    const itemToEdit = props.invList.find(item => item.SKU === SKU);
    //itemToEdit = find item that match the grabbed SKU from URL, and use it for edit.
    //console.log("itemToEdit: ", itemToEdit);

    const index = props.invList.findIndex(item => item.SKU === SKU);
    //console.log("index: ", index, typeof(index));


    const resetItem = {
        SKU: SKU,
        name: "",
        qty: 0,
        price: 0,
        description: "",
        image: "/pic/default.jpg"
    };

    const [invItem, setInvItem] = useState(resetItem);

    //error object contains error keys with messages
    const [errors, setErrors] = useState({});

    //success

    useEffect(() => {
        if (itemToEdit) {
            setInvItem(itemToEdit);
        }
    }, [itemToEdit]);
    //without 2nd arg = dependency, useEffect will run infinite loop!
    //dependency = trigger for useEffect

    //handle form input change
    const handleChange = (event) => {
        //the HTML element ID also match invItem field ID
        const { id, value } = event.target;
        console.log("handleChange name: ", id, " value: ", value);
        //it will update any field inside selected invItem with matching ID.
        setInvItem(prevState => ({ ...prevState, [id]: value }));
        validate();
    };

    const validate = () => {
        const newErrors = {}; //to be used as errors obj later to store error msgs

        //get input field values
        const newName = document.getElementById("name").value;
        const newQty = Number.parseInt(document.getElementById("qty").value);
        const newPrice = Number.parseFloat(document.getElementById("price").value);
        const newDesc = document.getElementById("description").value;
        const newImg = document.getElementById("image").value;
        //console.log(typeof (newQty), newQty, typeof (newPrice), newPrice);
        //const index = props.invList.findIndex(item => item.SKU === newSKU);

        //validate each fields
        //input validation, bc JSX form validation property setting doesn't help
        if (!/^[\w\d\s-_,:&+=]{2,20}$/i.test(newName)) {
            newErrors.name = "Product name must be 2 - 20 alphanumeric characters long.";
        }
        if (!/^[\d]{1,4}$/.test(newQty) || newQty < 0) {
            newErrors.qty = "Quantity must be a positive 1 to 4 digit integer  .";
        }
        if (!/^([\d]+[\\.]?[\d]*)$/.test(newPrice) || (
            toString(newPrice).length > 20 ||
            toString(newPrice).length < 1) ||
            isNaN(newPrice)) {
            newErrors.price = "Price must be a positive 1 to 20 digit float.";
        }
        if (newDesc.length === 0) {
            newErrors.description = "Please describe the item."
        }
        if (newImg.length === 0) {
            invItem.image = "/pic/default.jpg";
        }

        //change state => trigger render() again, including error msgs
        setErrors(newErrors);
        console.log("validate: ", errors);
        //if has error msg, return false
        return Object.keys(newErrors).length === 0;
    }

    const handleDelete = (event) => {
        event.preventDefault();

        const msgbox = document.getElementById('msgbox')
        msgbox.style.color = 'white';
        msgbox.innerText = "Delete successful! Redirecting..."
        setTimeout(() => { goto('/'); }, 2000)
        props.delItem(SKU);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validate()) {
            console.log("passed validation")
            props.updateInv(SKU, invItem);
            setInvItem(resetItem);
        }
        setErrors({}); //reset error msg

        document.getElementById('msgbox').innerText = "Update successful! Redirecting..."
        setTimeout(() => { goto('/'); }, 2000)
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3>SKU: {invItem.SKU}</h3>
                <img src={invItem.image} alt={"image of " + invItem.name}></img>

                <label>Product Name:
                    <input type="text" id="name" placeholder="Product Name" size="20"
                        value={invItem.name} onChange={handleChange} />
                    <p style={{ color: 'red' }}>{errors?.name}</p>
                </label>
                <label>Quantity:
                    <input type="number" step="1" min="0" max="9999" id="qty" placeholder="Quantity" size="4"
                        value={invItem.qty} onChange={handleChange} />
                    <p style={{ color: 'red' }}>{errors?.qty}</p>
                </label>
                <label>Price:
                    <input type="number" step="0.01" min="0" max="99999999.99" id="price" placeholder="Price" size="8"
                        value={invItem.price} onChange={handleChange} />
                    <p style={{ color: 'red' }}>{errors?.price}</p>
                </label>
                <label>Description:
                    <textarea id="description" placeholder="Product Description..."
                        value={invItem.description} onChange={handleChange} />
                    <p style={{ color: 'red' }}>{errors?.desc}</p>
                </label>
                <label>Image address:
                    <input type="text" id="image"
                        value={invItem.image} onChange={handleChange} />
                    <p style={{ color: 'red' }}>{errors?.price}</p>
                </label>
                <p id="msgbox" style={{ color: 'yellowgreen' }}></p>
                <button id="updateBtn" type="submit">Update</button>
                <button id="deleteBtn" type="click" onClick={handleDelete}>Delete</button>
                <Link
                    to={'/'}
                    element={<InventoryList />}>
                    <button>Back</button>
                </Link>
            </form>
            <Link
                to={'/edit/' + props.invList[(props.invList.length + index - 1) % props.invList.length].SKU}
                element={<ProductDetail />}>
                <div id='prevItem'>{'< Previous Item'}</div>
            </Link>
            <Link
                to={'/edit/' + props.invList[(index + 1) % props.invList.length].SKU}
                element={<ProductDetail />}>
                <div id='nextItem'>{'Next Item >'}</div>
            </Link>
        </>
    )
}