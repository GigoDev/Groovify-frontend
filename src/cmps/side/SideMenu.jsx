import { SideLib } from "./SideLib";
import { SideNav } from "./SideNav";
import { useEffect, useState } from 'react'

export function SideMenu() {
    const [isCollapsed, setIsCollapsed] = useState(false)
    function handleCollapse() {
        setIsCollapsed(prevState => !prevState)
    }

    useEffect(() => {//side effect for artist hero sizing on collapse
        const root = document.documentElement;

        if (isCollapsed) {
            root.style.setProperty('--hero-width', 'calc(100% - 110px)');
        } else {
            root.style.setProperty('--hero-width', 'calc(100% - 378px)');
        }
    }, [isCollapsed]);

    return (
        <div className={`side-menu ${isCollapsed ? 'collapsed' : ''}`}>
            <SideNav isCollapsed={isCollapsed} />
            <SideLib isCollapsed={isCollapsed} onCollapse={handleCollapse} />
        </div>
    )
}
