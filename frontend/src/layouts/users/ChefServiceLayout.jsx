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
                        text="Interviews"
                        href={"chefSRB.interview"}
                    />
                    <SideBarLinks
                        icon={<NotebookText size={22} />}
                        text="Offers"
                        href={"chefSRB.offers"}
                    />
                    <SideBarLinks
                        icon={<BookUser size={22} />}
                        text="Interns"
                        href={"chefSRB.interns"}
                    />
                    <SideBarLinks
                        icon={<GraduationCap size={22} />}
                        text="InternShips"
                        href={"chefSRB.internships"}
                    />
                    <SideBarLinks
                        icon={<Users size={22} />}
                        text="Accounts"
                        href={"chefSRB.accounts"}
                    />
                    <SideBarLinks
                        icon={<Workflow size={22} />}
                        text="Work Units"
                        href="/chefService/units"
                    />
                </SidebarContents>
                <div>
                    <Outlet />
                </div>
            </MereLayout>
        </>
    );
}

export default ChefServiceLayout;
