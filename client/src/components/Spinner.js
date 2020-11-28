import React from "react"

import "../css/Spinner.css"

function Spinner(props){
    const {text} = props

    return (
        <div className="spinner">
            <div className="spinner-obj"></div>
            {text && <h1>{text}</h1>}
        </div>
    )
}

export default Spinner