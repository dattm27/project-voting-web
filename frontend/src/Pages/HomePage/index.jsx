import GlassCard from '../../Components/GlassCard/index.jsx'
import GlassButton from "../../Components/GlassButton/index.jsx";
import CircleIcon from "../../Components/CircleIcon/index.jsx"
import GlassContainer from "../../Components/GlassContainer/index.jsx";
import './HomePage.css'
import { useSDK } from "@metamask/sdk-react";
import { useState } from "react";

function HomePage(){

  const [account, setAccount] = useState();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };

    return (
        <div className='home-page'>

        <h2>Creating Voting With Us</h2>
        <div className="card-conainer">
          <GlassCard>
            <h2>Create Vote</h2>
            <CircleIcon></CircleIcon>
            <h4 className="card-description">Ask people for things you can't decide on your own</h4>
            <GlassButton clickHandler={connect}></GlassButton>
          </GlassCard>
          <GlassCard>
            <h2>Vote others</h2>
            <CircleIcon ></CircleIcon>
            <h4 className="card-description">Help with your thoughts about what they can't decide</h4>
            <GlassButton clickHandler={connect}></GlassButton>
          </GlassCard>
          <GlassCard>
            <h2>Vote lists</h2>
            <CircleIcon></CircleIcon>
            <h4 className="card-description">Views all the votes you created tto update or view results</h4>
            <GlassButton clickHandler={connect}></GlassButton>
          </GlassCard>
        </div>
        </div>
    )
}

export default HomePage;