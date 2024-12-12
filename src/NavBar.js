import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar(){
    return (
        <div id="NavBar">
            <p>
                <Link to="/">Author</Link>
            </p>

            <p>
                <Link to="/inventory">Inventory</Link>
            </p>

            <p>
                <Link to="/add">Add Item</Link>
            </p>

            <p>
                <Link to="/DDorganizer">Organize</Link>
            </p>

            <p>
                <Link to="/location">Location</Link>
            </p>

            <p>
                <Link to="/contact">Contact</Link>
            </p>
        </div>
    )
}