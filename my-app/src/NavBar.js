import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar(){
    return (
        <div id="NavBar">
            <p>
                <Link to="/">Inventory</Link>
            </p>

            <p>
                <Link to="/add">Add Item</Link>
            </p>

            <p>
                <Link to="/about">About</Link>
            </p>
        </div>
    )
}