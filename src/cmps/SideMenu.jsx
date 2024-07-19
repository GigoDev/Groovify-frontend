import { SideLib } from "./SideLib";
import { SideNav } from "./SideNav";
import { Link } from 'react-router-dom'
import { useState } from 'react'

export function SideMenu() {
    const [isCollapsed, setIsCollapsed] = useState(false)

    function handleCollapse() {
        setIsCollapsed(prevState => !prevState)
    }

    return (
        <div className="side-menu">
            <SideNav isCollapsed={isCollapsed} />
            <SideLib isCollapsed={isCollapsed} onCollapse={handleCollapse} />
        </div>
    )
}