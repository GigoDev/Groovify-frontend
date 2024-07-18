import { SideLib } from "./SideLib";
import { SideNav } from "./SideNav";

export function SideMenu() {
    return (
        <section className="side-menu flex column">
            <h1>Side Menu</h1>
            <SideNav />
            <SideLib />
        </section>
    )
}