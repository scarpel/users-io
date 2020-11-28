import { useState } from "react"
import { useHistory } from "react-router-dom"
import {RiSearch2Line} from "react-icons/ri"
import "../css/SearchBar.css"

function SearchBar(props){
    const { urlFunction = (text) => `/users/${text}` } = props
    const [text, setText] = useState("")
    const history = useHistory()

    const handleClick = () => {
        if(text) history.push(urlFunction(text))
    }

    return (
        <div className="search-bar">
            <input type="text" value={text} placeholder="user's login" onChange={({target}) => {setText(target.value)}}/>
            <button onClick={handleClick}><RiSearch2Line /></button>
        </div>
    )
}

export default SearchBar