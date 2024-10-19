
import './HomePage.scss'
import {create_vote,make_vote} from '../../Assets/images'


function HomePage(){

    return (
        <div className='home-page'>

        <h2 className={'home-page-title gradient-text'}>Creating Voting With Us</h2>
        <div className="card-conainer ">
          <div className='home-container-card glassmophsism w-boder'>
            <div className={"home-image-div"}>
              <img className="home-image-card" src={make_vote} alt="make_vote" />
            </div>
            <h2 className="home-card-title gradient-text">Create Vote</h2>
            <h4 className="card-description">Ask people for things you can't decide on your own</h4>
          </div>

          <div className='home-container-card glassmophsism w-boder'>
            <div>
              <img className="home-image-card " src={make_vote} alt="make_vote" />
            </div>
            <h2 className="home-card-title gradient-text">Create Vote</h2>
            <h4 className="card-description">Ask people for things you can't decide on your own</h4>
          </div>

          <div className='home-container-card glassmophsism w-boder'>
            <div>
              <img className="home-image-card" src={create_vote} alt="make_vote" />
            </div>
            <h2 className="home-card-title gradient-text">Create Vote</h2>
            <h4 className="card-description">Ask people for things you can't decide on your own</h4>
          </div>
          
        </div>
        </div>
    )
}

export default HomePage;