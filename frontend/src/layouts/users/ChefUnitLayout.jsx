import React from "react";
import MereLayout from "../MereLayout";
import SidebarContents from "../../components/SidebarContent";
import { SideBarLinks } from "../../components/Sidebar";
import { Outlet } from "react-router-dom";
import { BookUser, ClipboardList, LayoutDashboard, ListCheck, ListTodo, NotebookText } from "lucide-react";

function ChefUnitLayout() {
    return (
        <>
            <MereLayout>
                <SidebarContents>
                    <SideBarLinks
                        icon={<LayoutDashboard size={22} />}
                        text={"Dashboard"}
                        href={"/chefUnits/"}
                        alert
                        notifs={"+2"}
                    />

                    <SideBarLinks
                        icon={<NotebookText size={22} />}
                        text={"Offres"}
                        href={"/chefUnits/offers"}
                    />

                    <SideBarLinks
                        icon={<BookUser size={22} />}
                        text={"Stagiaires"}
                        href={"/chefUnits/interns"}
                    />

                    <SideBarLinks
                        icon={<ClipboardList size={22} />}
                        text={"Taches"}
                        href={"/chefUnits/tasks"}
                    />
                </SidebarContents>
                <div className="h-full">
                    <Outlet />
                </div>
            </MereLayout>
        </>
    );
}

export default ChefUnitLayout;
