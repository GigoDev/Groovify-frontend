import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { SideMenu } from './cmps/side/SideMenu.jsx'
import { Player } from './cmps/Player.jsx'
import { ArtistDetails } from './pages/details/ArtistDetails.jsx'
import { PlaylistDetails } from './pages/details/PlaylistDetails.jsx'
import { SideLib } from './cmps/side/SideLib.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { GenrePage } from './pages/GenrePage.jsx'
import { LyricsPage } from './pages/LyricsPage.jsx'
import { login } from './store/actions/user.actions.js'
import { loadStations } from './store/actions/station.actions.js'


export function RootCmp() {

    useEffect(() => {
        init()
    }, [])

    async function init() {
        try {
            await login()
            loadStations()
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="app-container">
            <SideMenu />
            <main className="main-container">
                <AppHeader />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="genre/:label/:color" element={<GenrePage />} />
                    <Route path="artist/:id" element={<ArtistDetails />} />
                    <Route path="playlist/:id" element={<PlaylistDetails />} />
                    <Route path="playlist/" element={<PlaylistDetails />} />
                    <Route path="library" element={<SideLib />} />
                    <Route path="/login" element={<LoginSignup />} />
                    <Route path="/lyrics" element={<LyricsPage />} />
                </Routes>
                <AppFooter />
            </main>
            <UserMsg />
            <Player />
        </div>
    )
}


