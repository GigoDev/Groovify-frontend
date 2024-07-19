import React from 'react'
import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage'

// import { StationDetails } from './pages/StationDetails'
import { UserDetails } from './pages/UserDetails'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { SideMenu } from './cmps/SideMenu.jsx'
import { Player } from './cmps/Player.jsx'


export function RootCmp() {
    return (
        <div className="app-container">
            <SideMenu />
            <main className="main-container">
                <AppHeader />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="user/:id" element={<UserDetails />} />
                </Routes>
                <AppFooter />
            </main>
            <UserMsg />
            <Player />
        </div>
    )
}


