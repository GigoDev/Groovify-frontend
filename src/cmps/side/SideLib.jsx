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
import { useNavigate, useParams } from "react-router";
import { userService } from "../../services/user";

export function SideLib({ isCollapsed, onCollapse }) {
    const loggedInUser = userService.getLoggedinUser()
    const { id } = useParams()
    const navigate = useNavigate()
    const [filterBy, setFilterBy] = useState({ type: 'playlist', txt: '' })
    const sideStations = useSelector(state => state.stationModule.stations.filter(station => station.owner?._id || station.followBy?.some(user => user.userId === loggedInUser._id)))
    const [activeId, setActiveId] = useState(id)
    const newPlaylistCount = useRef(0)

    useEffect(() => {
        loadStations()
    }, [])


    async function onAddPlaylist() {
        try {
            const newPlaylist = stationService.getEmptyPlaylist()
            newPlaylist.name = `${newPlaylist.name}  #${++newPlaylistCount.current}`
            const savedPlaylist = await addStation(newPlaylist)
            setActiveId(savedPlaylist._id)
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
                sideStations={sideStations}
                isCollapsed={isCollapsed}
                activeId={activeId}
                setActiveId={setActiveId} />
        </section>
    )
}