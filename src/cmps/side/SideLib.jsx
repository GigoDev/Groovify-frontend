//REACT
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
//CMP
import { SideFilter } from "./SideFilter";
import { SideList } from "./SideList";

import { stationService } from '../../services/station'
import { addStation, loadStations } from "../../store/actions/station.actions";
//ICONS
import PlusIcon from "../../assets/icons/PlusIcon.svg"
import LibraryIcon from "../../assets/icons/LibraryIcon.svg"
import { useNavigate } from "react-router";

export function SideLib({ isCollapsed, onCollapse }) {
    const navigate = useNavigate()
    const [filterBy, setFilterBy] = useState({ type: 'playlist', txt: '' })
    const stations = useSelector(state => state.stationModule.stations)

    useEffect(() => {
        loadStations()
    }, [])
    const newPlaylistCount = useRef(0)


    async function onAddPlaylist() {
        try {
            const newPlaylist = stationService.getEmptyPlaylist()
            newPlaylist.name = `${newPlaylist.name}  #${++newPlaylistCount.current}`
            const savedPlaylist = await addStation(newPlaylist)
            navigate(`playlist/${savedPlaylist._id}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className={`side-lib ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="top-bar">
                <button className="your-library">
                    <LibraryIcon onClick={onCollapse} />
                    <span className="library" style={{ display: isCollapsed ? 'none' : 'inline' }}>Your Library</span>
                </button>
                <button className="add-btn">
                    <PlusIcon onClick={onAddPlaylist} />
                </button>
            </div>
            <SideFilter setFilterBy={setFilterBy} />
            <SideList
                filterBy={filterBy}
                stations={stations}
                isCollapsed={isCollapsed} />
        </section>
    )
}