import React from "react";
import MereLayout from "../MereLayout";
import SidebarContents from "../../components/SidebarContent";
import { SideBarLinks } from "../../components/Sidebar";
import { Outlet } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

function ChefUnitLayout() {
    return (
        <>
            <MereLayout>
                <SidebarContents>
                    <SideBarLinks
                        icon={<LayoutDashboard size={22} />}
                        text={"Dashboard"}
                        alert
                        notifs={"+2"}
                    />

                    <SideBarLinks
                        icon={<LayoutDashboard size={22} />}
                        text={"Dash"}
                        alert
                        notifs={"+2"}
                    />

                    <SideBarLinks
                        icon={<LayoutDashboard size={22} />}
                        text={"board"}
                        alert
                        notifs={"+2"}
                    />
                </SidebarContents>
                <div>
                    <Outlet />
                </div>
            </MereLayout>
        </>
    );
}

export default ChefUnitLayout;
