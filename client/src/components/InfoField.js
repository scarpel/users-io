import "../css/InfoField.css"

function InfoField(props){
    const {text, name} = props

    return (
        <div className="info-field">
            <h1 className={`text ${text.length>10? (text.length>20? "smaller": "small"): ""}`}>{text}</h1>
            <h3 className="name">{name}</h3>
        </div>
    )
}

export default InfoField