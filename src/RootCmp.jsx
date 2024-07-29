import React from 'react'
import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage'

import { UserDetails } from './pages/UserDetails'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { SideMenu } from './cmps/side/SideMenu.jsx'
import { Player } from './cmps/Player.jsx'
import { ArtistDetails } from './pages/details/ArtistDetails.jsx'
import { PlaylistDetails } from './pages/details/PlaylistDetails.jsx'
import { AlbumDetails } from './pages/details/AlbumDetails.jsx'
import { SideLib } from './cmps/side/SideLib.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { GenrePage } from './pages/GenrePage.jsx'


export function RootCmp() {
    return (
        <div className="app-container">
            <SideMenu />
            <main className="main-container">
                <AppHeader />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />}/>
                    <Route path="genre/:label/:color" element={<GenrePage />} />
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route path="artist/:id" element={<ArtistDetails />} />
                    <Route path="playlist/:id" element={<PlaylistDetails />} />
                    <Route path="playlist/" element={<PlaylistDetails />} />
                    <Route path="album/:id" element={<AlbumDetails />} />
                    <Route path="album/" element={<AlbumDetails />} />
                    <Route path="library" element={<SideLib />} />
                    <Route path="login" element={<LoginSignup />}>
                        <Route index element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route>

                </Routes>
                <AppFooter />
            </main>
            <UserMsg />
            <Player />
        </div>
    )
}


