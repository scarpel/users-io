import Helmet from "react-helmet"

function PageTitle(props){
    const{ main = "User.io", extra } = props

    return (
        <Helmet>
            <title>{`${main}${extra && ": " + extra}`}</title>
        </Helmet>
    )
}

export default PageTitle