import logo from '../../Assets/images/create-icon.png'
import './CircleIcon.css'


function CircleIcon(){
    // const lg = require(`../../Assets/${imageSrc}`).default;
    return(
        <div>
            <i></i>
            <img className="icon_img" src={logo} />
        </div>
    )
}

export default CircleIcon;