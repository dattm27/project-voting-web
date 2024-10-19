import { MetaMaskProvider } from "@metamask/sdk-react";


import HomePage from '../Pages/HomePage'
import LoginPage from '../Pages/LoginPage'
import DefaultLayout from '../Layout/DefaultLayout'
import OtherLayout from '../Layout/OtherLayout'
import VotePage from '../Pages/VotesPage'
import { useState} from "react";
//public routes

function HomeSite() {
    return (
        <DefaultLayout>
            <HomePage />
        </DefaultLayout>
    )
}

function LoginSite() {

    const [login, setLogin] = useState(null)
    return (
        
            <MetaMaskProvider
                debug={true}
                sdkOptions={{
                    dappMetadata: {
                        name: "Example React Dapp",
                        url: window.location.href,
                    },
                    infuraAPIKey: import.meta.env.VITE_INFURA_API_KEY,
                }}
            >
                <DefaultLayout login={login}>
                <LoginPage setLogin={setLogin}/>
                </DefaultLayout>
            </MetaMaskProvider>
        
    )
}
function VoteSite() {
    return (
        <OtherLayout >
            <VotePage />
        </OtherLayout>
    )
}


const publicRoutes = [
    { path: '/', component: HomeSite },
    { path: '/login', component: LoginSite },
    { path: '/votes', component: VoteSite },
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes };