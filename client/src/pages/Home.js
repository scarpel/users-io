import React from "react"
import PageTitle from "../components/PageTitle"
import { useHistory } from "react-router-dom"
import SearchBar from "../components/SearchBar"
import Circle from "../svg/circle.svg"
import "../css/Home.css"

function Home(){
    const history = useHistory()

    return(
        <>
            <PageTitle extra="Get access to Github users information"/>
            <div className="home">
                <SearchBar />
                <main>
                    <h1>users<span>.io</span></h1>
                    <p>Get access to Github users<br/>informations easier</p>
                    <button onClick={() =>  {history.push("/users") }}>GO TO USERS</button>
                </main>
                <div className="background">
                    <img className="circle-1" src={Circle} alt="circle"/>
                    <img className="circle-2" src={Circle} alt="circle"/>
                    <img className="circle-3" src={Circle} alt="circle"/>
                    <img className="circle-4" src={Circle} alt="circle"/>
                </div>
            </div>
        </>
    )
}

export default Home