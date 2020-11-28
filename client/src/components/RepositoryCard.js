import React from "react"

import "../css/RepositoryCard.css"

function RepositoryCard(props){
    const {repository, style} = props

    return (
        <a href={repository.html_url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
            <div className="repository-card" style={style}>
                <h3 className={`id ${repository.id>100000000000?"small":""}`}>{repository.id}</h3>
                <h1 className={`name ${repository.name.length>40?"small":""}`}>{repository.name}</h1>
                <div className="language">{repository.language || "Unknown"}</div>
            </div>
        </a>
    )
}

export default RepositoryCard