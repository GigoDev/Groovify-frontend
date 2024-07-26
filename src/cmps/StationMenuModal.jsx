import { useState, useRef } from "react";

export function StationMenuModal({ trigger, options }) {
    const [isContextMenuVisible, setIsContextMenuVisible] = useState(false)
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })
    const triggerRef = useRef(null)

    function openContextMenu(event) {
        event.stopPropagation()
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect()
            const windowWidth = window.innerWidth
            const menuWidth = 200

            const leftPosition =
                rect.right + menuWidth > windowWidth
                    ? rect.left - menuWidth
                    : rect.left

            setMenuPosition({
                top: rect.bottom + window.scrollY,
                left: leftPosition + window.scrollX
            })
        }
        setIsContextMenuVisible(true)
    }

    function closeContextMenu() {
        setIsContextMenuVisible(false)
    }

    return (
        <>
            <div onClick={openContextMenu} ref={triggerRef}>
                {trigger}
            </div>
            {isContextMenuVisible && (
                <div
                    className="context-menu show"
                    style={{
                        top: `${menuPosition.top}px`,
                        left: `${menuPosition.left}px`
                    }}
                >
                    <div className="menu-overlay" onClick={closeContextMenu}></div>
                    <div className="menu-content">
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className="menu-item"
                                onClick={() => {
                                    option.onClick()
                                    closeContextMenu()
                                }}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
