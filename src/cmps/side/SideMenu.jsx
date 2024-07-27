import { SideLib } from "./SideLib";
import { SideNav } from "./SideNav";
import { useEffect, useState } from 'react'

export function SideMenu() {
    const [isCollapsed, setIsCollapsed] = useState(false)
    function handleCollapse() {
        setIsCollapsed(prevState => !prevState)
    }

    // useEffect(() => {
    //     const heroElement = document.querySelector('.hero');
    //     if (heroElement) {
    //         isCollapsed ? heroElement.classList.add('collapsed') : heroElement.classList.remove('collapsed')
    //     }
    // }, [isCollapsed]);

    useEffect(() => {//side effect for artist hero sizing on collapse
        const root = document.documentElement;

        if (isCollapsed) {
            root.style.setProperty('--hero-width', 'calc(100% - 140px)');
        } else {
            root.style.setProperty('--hero-width', 'calc(100% - 410px)');
        }
    }, [isCollapsed]);

    return (
        <div className={`side-menu ${isCollapsed ? 'collapsed' : ''}`}>
            <SideNav isCollapsed={isCollapsed} />
            <SideLib isCollapsed={isCollapsed} onCollapse={handleCollapse} />
        </div>
    )
}
