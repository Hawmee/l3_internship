import React from "react";
import MereLayout from "../MereLayout";
import SidebarContents from "../../components/SidebarContent";
import { SideBarLinks } from "../../components/Sidebar";
import {
    BookUser,
    GraduationCap,
    Handshake,
    LayoutDashboard,
    NotebookText,
    Users,
    Workflow,
} from "lucide-react";
import { Outlet } from "react-router-dom";


function ChefServiceLayout() {

    return (
        <>
            <MereLayout>
                <SidebarContents>
                    <SideBarLinks
                        icon={<LayoutDashboard size={22} />}
                        text={"Dashboard"}
                        href={"/chefService/"}
                        alert
                        notifs={"2+"}
                    />
                    <SideBarLinks
                        icon={<Handshake size={22} />}
                        text="Entretient"
                        href={"/chefService/interviews"}
                    />
                    <SideBarLinks
                        icon={<NotebookText size={22} />}
                        text="Offres"
                        href={"/chefService/offers"}
                    />
                    <SideBarLinks
                        icon={<BookUser size={22} />}
                        text="Stagiaires"
                        href={"/chefService/Interns"}
                    />
                    <SideBarLinks
                        icon={<GraduationCap size={22} />}
                        text="Stages"
                        href={"/chefService/Internships"}
                    />
                    <SideBarLinks
                        icon={<Users size={22} />}
                        text="Comptes utilisateurs"
                        href={"/chefService/accounts"}
                    />
                    <SideBarLinks
                        icon={<Workflow size={22} />}
                        text="Unités de travail"
                        href="/chefService/units"
                    />
                </SidebarContents>
                <div className="h-full">
                    <Outlet />
                </div>
            </MereLayout>
        </>
    );
}

export default ChefServiceLayout;
