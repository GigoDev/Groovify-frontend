import { SideLib } from "./SideLib";
import { SideNav } from "./SideNav";
import { Link } from 'react-router-dom'
import { useState } from 'react'

export function SideMenu() {
    return (
        <div className="side-menu">
            {/* <h1>Side Menu</h1> */}
            <SideNav />
            <SideLib />
        </div>
    )

}