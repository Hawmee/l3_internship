import {
    BookUser,
    ClipboardList,
    Handshake,
    LayoutDashboard,
    NotebookText,
} from "lucide-react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { SideBarLinks } from "../../components/Sidebar";
import SidebarContents from "../../components/SidebarContent";
import MereLayout from "../MereLayout";

function ChefUnitLayout() {
    const user = useSelector((state) => state.currentUser.value);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && !user.isChefUnit) {
            navigate("/guest/login");
        }
    }, [user]);

    return (
        <>
            <MereLayout>
                <SidebarContents>
                    <SideBarLinks
                        icon={<NotebookText size={22} />}
                        text={"Offres"}
                        href={"/chefUnits/"}
                    />

                    <SideBarLinks
                        icon={<Handshake size={22} />}
                        text={"Entretiens"}
                        href={"/chefUnits/interviews"}
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
