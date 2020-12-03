const express = require("express")
const path = require("path")
const fetch = require("node-fetch")

const app = express()

app.use(express.static(path.join(__dirname, "client/build")))

function sendBadRequest(res, message="Invalid fields!"){
    res.status(400).send({message})
}

app.get("/api/users", (req, res) => {
    let {since = 0, per_page = 10} = req.query

    if(since>=0){
        if(per_page>0){
            fetch(`https://api.github.com/users?since=${since}&per_page=${per_page}`)
                .then(resp => {
                    if(resp.ok){
                        resp.json()
                            .then(obj => {
                                    res.status(resp.status).send({
                                        users: obj,
                                        nextPage: Object.keys(obj).length === per_page? `/api/users?since=${since+per_page}&per_page=${per_page}` : undefined
                                    })
                                })
                    }else{
                        res.status(resp.status).send({})
                    }
                })
                .catch(err => {
                    res.status(err.status).send({})
                })
        }else res.status(400).send({message: "Per_page must be a positive number bigger than zero!"})
    }else res.status(400).send({message: "Since must be a positive number!"})
})

app.get("/api/users/:username/details", (req, res) => {
    const {username} = req.params
    if(username){
        fetch(`https://api.github.com/users/${username}`)
            .then(resp => {
                if(resp.ok){
                    resp.json()
                        .then(user => {
                            res.status(resp.status).send({user})
                        })
                }
                else res.status(resp.status).send({})
            })
            .catch(error => {
                console.log(error)
                res.send({error})
            })
    }else sendBadRequest(res, "Username must be informed!")
})

app.get("/api/users/:username/repos", (req, res) => {
    const {username} = req.params

    if(username){
        fetch(`https://api.github.com/users/${username}/repos`)
            .then(resp => {
                if(resp.ok){
                    resp.json().then(repos => {
                        res.status(resp.status).send({repos})
                    })
                }else res.status(resp.status).send({})
            })
            .catch(error => {
                console.log(error)
                res.send({error})
            })
    }else sendBadRequest(res,"Username must be informed!")
})

app.get("/api/*", (req, res) => {
    res.status(400).send({})
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})

const port = process.env.PORT || 5000
app.listen(port)

console.log(".: users.io backend :.")
console.log(`Listening to port ${port}`)

module.exports = app