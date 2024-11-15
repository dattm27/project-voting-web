import { MetaMaskProvider } from "@metamask/sdk-react";


import HomePage from '../Pages/HomePage'
import LoginPage from '../Pages/LoginPage'
import DefaultLayout from '../Layout/DefaultLayout'
import SearchPage from '../Pages/Search'
import { useState} from "react";
import VotesPage from "../Pages/VotesPage";
import CreateVote from "../Pages/CreateVote";
import VoteDetailPage from '../Pages/VoteDetailPage';
import TestPage from "../Pages/TestPage";
import NotFoundPage from "../Pages/NotFoundPage";
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
function SearchSite() {
    return (
        <DefaultLayout >
            <SearchPage />
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
function VoteDetailSite() {
    return (
        <DefaultLayout >
            <VoteDetailPage />
        </DefaultLayout>
    )
}

function TestSite() {
    return (
        <DefaultLayout >
            <TestPage />
        </DefaultLayout>
    )
}

function NotFoundSite() {
    return (
        <DefaultLayout >
            <NotFoundPage />
        </DefaultLayout>
    )
}


const publicRoutes = [
    { path: '/', component: VotesSite },
    { path: '/home', component: HomeSite },
    { path: '/vote/:voteAddr', component: VoteDetailSite },
    { path: '/login', component: LoginSite },
    { path: '/test', component: TestSite },
    { path: '/search', component: SearchSite },
    { path: '/create-vote', component: CreateVoteSite },

    //every path that have no match go here
    { path: '*' , component: NotFoundSite}
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes };