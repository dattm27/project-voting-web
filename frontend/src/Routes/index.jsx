import { MetaMaskProvider } from "@metamask/sdk-react";


import HomePage from '../Pages/HomePage'
import DefaultLayout from '../Layout/DefaultLayout'
import SearchPage from '../Pages/Search'
import VotesPage from "../Pages/VotesPage";
import CreateVote from "../Pages/CreateVote";
import VoteDetailPage from '../Pages/VoteDetailPage';
import TestPage from "../Pages/TestPage";
import NotFoundPage from "../Pages/NotFoundPage";
import HistoryPage  from "../Pages/HistoryPage";
import UserHistoryPage  from "../Pages/UserHistoryPage";
//public routes

function HomeSite() {
    return (
        <DefaultLayout>
            <HomePage />
        </DefaultLayout>
    )
}
function HistorySite() {
    return (
        <DefaultLayout>
            <HistoryPage />
        </DefaultLayout>
    )
}
function UserHistorySite() {
    return (
        <DefaultLayout>
            <UserHistoryPage />
        </DefaultLayout>
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
    { path: '/vote/history/:voteAddr', component: HistorySite },
    { path: '/user/history/:userAddr', component: UserHistorySite },
    { path: '/test', component: TestSite },
    { path: '/search', component: SearchSite },
    { path: '/create-vote', component: CreateVoteSite },

    //every path that have no match go here
    { path: '*' , component: NotFoundSite}
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes };