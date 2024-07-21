//REACT
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
//CMP
import { SideFilter } from "./SideFilter";
import { SideList } from "./SideList";
import { SideSort } from "./SideSort";

import {stationService} from '../../services/station'
import { addStation } from "../../store/actions/station.actions";
//ICONS
import PlusIcon from "../../assets/icons/PlusIcon.svg"
import LibraryIcon from "../../assets/icons/LibraryIcon.svg"

export function SideLib({ isCollapsed, onCollapse }) {
    const stations = useSelector(storeState => storeState.stationModule.stations)
    const [filterBy,setFilterBy] = useState('')

    useEffect(() => {
        //to filter the station list by sideFilterValue   

    }, []);

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
            <SideSort />
            <SideFilter setFilterBy={setFilterBy}/>

            <SideList stations={stations} />
        </section>
    )
}