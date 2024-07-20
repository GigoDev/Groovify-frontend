import { SidePreview } from "./SidePreview"

export function SideList({ stations }) {
    console.log('stations', stations)
    return (
        <div className="side-list">
            
                <article className="side-preview-container">
                    <SidePreview/>
                </article>
            
        </div>
    )
}