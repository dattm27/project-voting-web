import './GlassButton.css'

function GlassButton({clickHandler}){

    return(
        <button type="button" className="glass-btn btn" onClick={clickHandler}>
            Let Try
        </button>
    )
}

export default GlassButton;