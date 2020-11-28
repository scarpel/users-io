import Header from "../components/Header"
import PageTitle from "../components/PageTitle"
import Circle from "../svg/dotted.svg"
import Missing from "../svg/missing.svg"

import "../css/PageNotFound.css"

function PageNotFound(){
    return (
        <>
            <PageTitle extra="Error 404"/>
            <div className="page-not-found">
                <Header />
                <main>
                    <img className="missing" src={Missing} alt="missing"/>
                    <h1>Error 404</h1>
                    <p>
                        Wow, what happened?! I swear I saw it somewhere!
                        <br/>
                        Well, I cound't find what you are looking for right now.
                        <br/>
                        Try again later, please!
                    </p>
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

export default PageNotFound