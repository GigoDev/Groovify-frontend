import React from 'react'
import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage'

// import { StationDetails } from './pages/StationDetails'
import { UserDetails } from './pages/UserDetails'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'


export function RootCmp() {
    return (
        <div className="main-container">
            <AppHeader />
            <UserMsg />

            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    {/* <Route path="station/:stationId" element={<StationDetails />} /> */}
                    <Route path="user/:id" element={<UserDetails />} />
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


