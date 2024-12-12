import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./AddInventory.css";
import InventoryList from './InventoryList';

export default function AddInventory(props){

    //console.log("ProductionDetail props:", props);

    //init
    const goto = useNavigate();

    //used in resetItem template & validate() 
    // how to use?  {}? ${}? `${}`?  none worked 
    // tried different path too, from /web_dev_proj, or /src, or /public. //../public/pic/default.jpg
    const defaultImgPath = "/pic/default.jpg";

    const resetItem = {
        SKU: "",
        name: "",
        qty: 0,
        price: 0,
        description: "",
        image: `${defaultImgPath}`
    };

    const [invItem, setInvItem] = useState(resetItem);

    //error object contains error keys with messages
    const [errors, setErrors] = useState({});

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
        const newSKU = document.getElementById("SKU")?.value;
        const newName = document.getElementById("name")?.value;
        const newQty = Number.parseInt(document.getElementById("qty")?.value);
        const newPrice = Number.parseFloat(document.getElementById("price")?.value);
        const newDesc = document.getElementById("description").value;
        const newImg = document.getElementById("image")?.value;
        //console.log(typeof (newQty), newQty, typeof (newPrice), newPrice);
        const index = props.invList.findIndex(item => item.SKU === newSKU);

        //validate each fields
        //input validation, bc JSX form validation property setting doesn't help
        if (!/(^[\w\d]{8,13}$)+/i.test(newSKU)) {
            newErrors.SKU = "SKU must be 8 - 13 alphanumeric characters long.";
        }
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
        //description check
        if (newDesc.length === 0){
            newErrors.description = "Please describe the item."
        }
        //image file loc check
        if (newImg.length === 0){
            invItem.image = `${defaultImgPath}`;
        }

        if (index !== -1) {
            newErrors.SKU = "SKU repeated! Please enter a unique SKU.";
        }

        //change state => trigger render() again, including error msgs
        setErrors(newErrors);
        console.log("validate: ", errors);
        //if has error msg, return false
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (validate()) {
            console.log("passed validation")
            props.addItem(invItem);
            setInvItem(resetItem); //reset form to blank
            setErrors({}); //reset error msg

            document.getElementById('msgbox').innerText="Update successful! Redirecting..."
            setTimeout(()=>{goto('/inventory');}, 2000)
        }else{
            setInvItem(invItem); //trigger render of error msg
        }
    }

    return (
        <form id="addform" onSubmit={handleSubmit}>
            <h3>Add New Item</h3>
            <img src={invItem?.image} alt={"image of " + invItem?.name}></img>
            
            <label>SKU: 
                <input type="text" id="SKU" placeholder="8-13 characters"
                    value={invItem?.SKU} onChange={handleChange} />
                <p style={{color:'red'}}>{errors?.SKU}</p>
            </label>    
            <label>Product Name:
                <input type="text" id="name" placeholder="Product Name"
                    value={invItem?.name} onChange={handleChange} />
                <p style={{ color: 'red' }}>{errors?.name}</p>
            </label>
            <label>Quantity:
                <input type="number" step="1" min="0" max="9999" id="qty" placeholder="Quantity"
                    value={invItem?.qty} onChange={handleChange} />
                <p style={{ color: 'red' }}>{errors?.qty}</p>
            </label>
            <label>Price:
                <input type="number" step="0.01" min="0" max="99999999.99" id="price" placeholder="Price"
                    value={invItem?.price} onChange={handleChange} />
                <p style={{ color: 'red' }}>{errors?.price}</p>
            </label>
            <label>Location:
                <select id="location" defaultValue={"storage"}
                    value={invItem?.location} onChange={handleChange}>
                        <option value="storage">Storage</option>
                        <option value="produce1">Produce Area 1</option>
                        <option value="produce2">Produce Area 2</option>
                        <option value="aisle1">Aisle 1</option>
                        <option value="aisle2">Aisle 2</option>
                        <option value="freezer1">Freezer 1</option>
                        <option value="freezer2">Freezer 2</option>
                </select>
                <p style={{ color: 'red' }}>{errors?.location}</p>
            </label>
            <label>Description:
                <textarea id="description" placeholder="Product Description..."
                    value={invItem?.description} onChange={handleChange} />
                <p style={{ color: 'red' }}>{errors?.description}</p>
            </label>
            <label>Image address:
                <input type="text" id="image"
                    value={invItem?.image} onChange={handleChange} />
                <p style={{ color: 'red' }}>{errors?.image}</p>
            </label>
            <p id="msgbox" style={{ color: 'yellowgreen' }}></p>
            <button id="updateBtn" type="submit">Update</button>
            <Link
                to={'/inventory'}
                element={<InventoryList />}>
                <button>Cancel & Go Back</button>
            </Link>
        </form>
    )
}