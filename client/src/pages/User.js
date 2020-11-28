import React, {useEffect, useState} from "react"
import PageTitle from "../components/PageTitle"
import Header from "../components/Header"
import Spinner from "../components/Spinner"
import { useParams } from "react-router-dom"
import RepositoryCard from "../components/RepositoryCard"
import { FiMapPin } from "react-icons/fi"
import { FaTwitter, FaGithub } from "react-icons/fa"
import { BiWorld } from "react-icons/bi"
import InfoField from "../components/InfoField"
import { useHistory } from "react-router-dom"

import Circle from "../svg/circle.svg"

import "../css/User.css"

const socials = [
    ["twitter_username", FaTwitter, (text) => `https://twitter.com/${text}`],
    ["blog", BiWorld, (text) => text],
    ["html_url", FaGithub,(text) => text]
]

function parseDate(date){
    const newDate = new Date(Date.parse(date))
    return `${newDate.getDate().toString().padStart(2, "0")}/${(newDate.getMonth()+1).toString().padStart(2, "0")}/${newDate.getFullYear()}`
}

function getUserInfo(user){
    return(
        <>
            <div className="user-card box">
                <img className="user-img" src={user.avatar_url} alt="user"/>
                <div className="user-text">
                    <div className="social">
                        {
                            socials.map(([field, Icon, func]) => 
                                user[field] && 
                                    <a href={func(user[field])} target="_blank" rel="noopener noreferrer">
                                        <div>
                                            <Icon />
                                        </div>
                                    </a>
                            )
                        }
                    </div>
                    <h1 className="name"><a href={user.html_url} target="_blank" rel="noopener noreferrer" style={{textDecoration: "none"}}>{user.name}</a></h1>
                    <div className="location"><FiMapPin /> {user.location || "Unknown Location"}</div>
                </div>
            </div>
            <div className="git-card box">
                    {<InfoField text={user.id.toString()} name="id"/>}
                    {<a href={user.html_url} target="_blank" rel="noopener noreferrer" style={{textDecoration: "none"}}><InfoField text={user.login} name="login"/></a>}
                    {<InfoField text={parseDate(user.created_at)} name="created at"/>}
            </div>
        </>
    )
}

function User(){
    const {login} = useParams()
    const [user, setUser] = useState(undefined)
    const [repos, setRepos] = useState(undefined)
    const history = useHistory()

    useEffect(() => {
        fetch(`/api/users/${login}/details`)
            .then(resp => {
                if(resp.ok) resp.json().then(({user}) => {setUser(user)})
                else history.push("/404")
            })
        
        fetch(`/api/users/${login}/repos`)
            .then(resp => {
                if(resp.ok) resp.json().then(({repos}) => setRepos(repos))
                else history.push("/404")
            })
    }, [login])

    return(
        <>
            <PageTitle extra={login}/>
            <div className="user">
                <Header />
                {
                    user && repos?
                        <>
                            <div className="top">
                                { getUserInfo(user) }
                            </div>
                            <div className="bottom">
                                {
                                    repos.length>0?
                                        <>
                                            <h1 className="repo-title">Repositories {repos && <span>{`(${repos.length})`}</span>}</h1>
                                            <div className="repository-cards">
                                                <div className="repository-header">
                                                    <h1>ID</h1>
                                                    <h1>Name</h1>
                                                    <h1>Language</h1>
                                                </div>
                                                { repos.map((repo, index) => (
                                                    <RepositoryCard key={repo.id} repository={repo} style={{animationDelay: `${index*100}ms`}}/>
                                                ))}
                                            </div>
                                        </>
                                        :
                                        <h1 className="no-repository">No  repository  was  found!</h1>
                                }
                            </div>
                        </>
                        :
                        <Spinner />
                }
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

export default User