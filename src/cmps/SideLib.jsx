import { SideFilter } from "./SideFilter";
import { SideList } from "./SideList";
import { SideSort } from "./SideSort";
import { TrackList } from "./TrackList";

export function SideLib({ isCollapsed, onCollapse, stations }) {
    return (
        <div className={`side-lib ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="top-bar">
                <button className="your-library">
                    <svg
                        role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" className="Svg-sc-ytk21e-0 haNxPq" onClick={onCollapse}>
                        <path d="M14.5 2.134a1 1 0 0 1 1 0l6 3.464a1 1 0 0 1 .5.866V21a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 .5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zm6 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1z" fill="#b3b3af">
                        </path>
                    </svg>
                    <span className="library" style={{ display: isCollapsed ? 'none' : 'inline' }}>Your Library</span>
                </button>

                <button className="add-btn">
                    <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon">
                        <path className="plus-icon" d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z" fill="#b3b3af">
                        </path>
                    </svg>
                </button>
            </div>
            <SideSort />
            <SideFilter />
            <SideList stations={stations}/>
        </div>
    )
}