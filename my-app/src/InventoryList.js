import React from 'react';  //this is required for .map() to work in JSX
import InventoryItem from './InventoryItem';
import "./InventoryList.css";

function InventoryList(props) {
    //console.log("invlist: ", props.invList, typeof (props.invList), Array.isArray(props.invList), props.invList === undefined);
    //console.log("delete func: ", typeof(props.delItem)==='function');

    return (
        <div className="canvas">
            {/*list rendering*/}
            {props.invList.map(item => (
                <InventoryItem
                    key = {item.SKU}
                    item = {item}
                    delItem = {props.delItem}
                    updateItem = {props.updateItem}
                ></InventoryItem>
            ))}
        </div>
    );
}

export default InventoryList;