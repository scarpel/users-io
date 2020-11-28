import SearchBar from "./SearchBar"
import { Link } from "react-router-dom"

import "../css/Header.css"

function Header(){
    return (
        <div id="header">
            <div className="left">
                <Link to="/">
                    <h1>users<span>.io</span></h1>
                </Link>
            </div>
            <div className="right">
                <SearchBar />
            </div>
        </div>
    )
}

export default Header