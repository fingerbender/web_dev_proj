import { Link } from "react-router-dom";
import './App.css';

export default function Navbar() {
    return (
        <div className="App">
            <center>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </center>
        </div>
    )
}