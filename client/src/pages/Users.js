import React, {useState, useEffect} from "react"
import PageTitle from "../components/PageTitle"
import { FaRegUserCircle, FaRegAddressCard } from "react-icons/fa"
import { AiOutlineTable } from "react-icons/ai"
import UserCard from "../components/UserCard"
import Spinner from "../components/Spinner"
import Header from "../components/Header"
import Circle from "../svg/circle.svg"
import { Link } from "react-router-dom"

import "../css/Users.css"
import "../css/Table.css"
import "../css/Circles.css"

const displayFunction = {
    TABLE: getUsersTable,
    CARD: getUsersCards
}

function getUsers(users, displayFunction){
    if(users.length === 0) return <h1>No users found!</h1>
    else return displayFunction(users)
}

function getUsersTable(users){
    return (
        <div className="users-table">
            <div className="table-header">
                <div className="header img">{<FaRegUserCircle/>}</div>
                <div className="header id">ID</div>
                <div className="header login">Login</div>
            </div>
            <div className="table-body">
                {
                    users && users.map((user, index) => (
                        <Link to={`/users/${user.login}`} key={user.id} style={{textDecoration:"none"}}>
                            <div className="table-fields" style={{animationDelay: `${index*200}ms`}}>
                                <div className="img"><img src={user.avatar_url} alt="user-avatar"/></div>
                                <div className="id">{user.id}</div>
                                <div className="login">{user.login}</div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

function getUsersCards(users){
    return (
        <div className="users-cards">
            {users && users.map((user, index) =>
            (
                <Link to={`/users/${user.login}`} key={user.id} style={{textDecoration:"none"}}>
                    <UserCard user={user} style={{animationDelay: `${index*100}ms`}}/>
                </Link>
            ))}
        </div>
    )
}

function Users(){
    const [users, setUsers] = useState([])
    const [displayFunc, setDisplayFunc] = useState(1)
    const [numElements, setNumElements] = useState(10)
    const [isLoading, setIsLoading] = useState(true)
    const [startIndexes, setStartIndexes] = useState([])

    useEffect(() => {
        setIsLoading(true)
        fetchUsers((obj) => {
            setIsLoading(false)
            handleNext(obj)
        })
    }, [numElements])

    const fetchUsers = (callback, since=0) => {
        fetch(`/api/users?since=${since}&per_page=${numElements}`)
            .then(resp => {
                if(resp.ok) resp.json().then(callback)
                else setUsers([])
            })
            .catch(err => {
                console.log(err)
                setUsers([])
            })
    }

    const previous = () => {
        const arr = startIndexes.slice(0,startIndexes.length-1)

        setStartIndexes(arr)
        setIsLoading(true)
        fetchUsers((obj) => {
            setIsLoading(false)
            handlePrevious(obj)
        }, arr[arr.length-1][0]-1)
    }

    const next = () => {
        setIsLoading(true)
        fetchUsers((obj) => {
            setIsLoading(false)
            handleNext(obj)
        }, startIndexes[startIndexes.length-1][1])
    }

    const handleNext = ({users}) => {
        if(users.length>0) setStartIndexes([...startIndexes, [users[0].id, users[users.length-1].id]])
        setUsers(users)
    }

    const handlePrevious = ({users}) => {
        setUsers(users)
    }

    const handleChangeNumElements = ({target}) => {
        startIndexes.pop()
        setNumElements(target.options[target.selectedIndex].value)
    }

    return(
        <>
            <PageTitle extra="Users"/>
            <div className="users">
                <Header />
                <div className="tray">
                    <div className="num-itens">
                        Number of Itens:
                        <select onChange={handleChangeNumElements}>
                            <option onChange={handleChangeNumElements} value="10">10</option>
                            <option onChange={handleChangeNumElements} value="25">25</option>
                            <option onChange={handleChangeNumElements} value="50">50</option>
                            <option onChange={handleChangeNumElements} value="100">100</option>
                        </select>
                    </div>
                    <div className="display-type">
                        <label>
                            <input type="radio" name="display" checked={displayFunc === 1} onChange={() => setDisplayFunc(1)}/>
                            <div><AiOutlineTable/></div>
                        </label>
                        <label>
                            <input type="radio" name="display"  checked={displayFunc === 2} onChange={() => setDisplayFunc(2)}/>
                            <div><FaRegAddressCard/></div>
                        </label>
                    </div>
                    <div className="directional-btns">
                        <button className="previous" disabled={startIndexes.length<=1} onClick={previous}> Previous Page</button>
                        <button className="next" onClick={next}>Next Page</button>
                    </div>
                </div>
                <div className="fields">
                    {
                        isLoading?
                            <Spinner />
                            :
                            getUsers(users, displayFunc === 1? displayFunction.TABLE : displayFunction.CARD)
                    }
                </div>
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

export default Users