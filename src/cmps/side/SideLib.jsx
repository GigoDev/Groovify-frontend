//REACT
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
//CMP
import { SideFilter } from "./SideFilter";
import { SideList } from "./SideList";

import {stationService} from '../../services/station'
import { addStation } from "../../store/actions/station.actions";
//ICONS
import PlusIcon from "../../assets/icons/PlusIcon.svg"
import LibraryIcon from "../../assets/icons/LibraryIcon.svg"

export function SideLib({ isCollapsed, onCollapse }) {
    const stations = useSelector(storeState => storeState.stationModule.stations)
    const [filterBy,setFilterBy] = useState({type:'artist',txt:''})
    const [filtered,setFiltered] = useState(stations)

    useEffect(() => {
        setFiltered(stations.filter(station => station.type === filterBy.type))
        // console.log('filterBy',filterBy)
    }, [filterBy,stations]);

   
    function onAddPlaylist(){
        const newPlaylist = stationService.getEmptyPlaylist()
        const savedPlaylist = addStation(newPlaylist)
        console.log(savedPlaylist)
        //store for global updates
    }


    return (
        <section className={`side-lib ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="top-bar">
                <button className="your-library">
                    <LibraryIcon onClick={onCollapse} />
                    <span className="library" style={{ display: isCollapsed ? 'none' : 'inline' }}>Your Library</span>
                </button>
                <button className="add-btn">
                    <PlusIcon onClick={onAddPlaylist}/>
                </button>
            </div>
            <SideFilter setFilterBy={setFilterBy}/>
            <SideList stations={filtered} />
        </section>
    )
}