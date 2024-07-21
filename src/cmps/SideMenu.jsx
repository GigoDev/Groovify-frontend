import { SideLib } from "./SideLib";
import { SideNav } from "./SideNav";
import { useState } from 'react'
import { useSelector } from "react-redux";

export function SideMenu() {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const stations = useSelector(storeState => storeState.stationModule.stations)

    function handleCollapse() {
        setIsCollapsed(prevState => !prevState)
    }

    return (
        <div className="side-menu">
            <SideNav isCollapsed={isCollapsed} />
            <SideLib stations={stations} isCollapsed={isCollapsed} onCollapse={handleCollapse} />
        </div>
    )
}