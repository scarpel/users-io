import React from "react"
import "../css/UserCard.css"

function UserCard(props){
    const {id, avatar_url, login} = props.user

    return (
        <div className="user-card" style={props.style}>
            <img src={avatar_url} alt="user-avatar"/>
            <div className="user-info">
                <h2 className={`id ${id>1000000000000?"small":""}`}>{id}</h2>
                <h1 className={`login ${login.length>=10?(login.length>=20?"smaller":"small"):""}`}>{login}</h1>
            </div>
        </div>
    )
}

export default UserCard