import { MetaMaskProvider } from "@metamask/sdk-react";


import HomePage from '../Pages/HomePage'
import LoginPage from '../Pages/LoginPage'
import DefaultLayout from '../Layout/DefaultLayout'
import VotePage from '../Pages/MakeVote'
import { useState} from "react";
import VotesPage from "../Pages/VotesPage";
import CreateVote from "../Pages/CreateVote";
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
        <DefaultLayout >
            <VotePage />
        </DefaultLayout>
    )
}

function VotesSite() {
    return (
        <DefaultLayout >
            <VotesPage />
        </DefaultLayout>
    )
}

function CreateVoteSite() {
    return (
        <DefaultLayout >
            <CreateVote />
        </DefaultLayout>
    )
}


const publicRoutes = [
    { path: '/', component: HomeSite },
    { path: '/login', component: LoginSite },
    { path: '/votes', component: VotesSite },
    { path: '/vote', component: VoteSite },
    { path: '/create-vote', component: CreateVoteSite },
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes };