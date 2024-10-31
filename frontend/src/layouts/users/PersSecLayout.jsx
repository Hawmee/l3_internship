// import React from 'react'
import MereLayout from "../MereLayout";
import SidebarContents from "../../components/SidebarContent.jsx";
import { SideBarLinks } from "../../components/Sidebar.jsx";
import { BookUser, Handshake, NotebookText } from "lucide-react";
import { Outlet } from "react-router-dom";

function PersSecLayout() {
    return (
        <>
            <MereLayout>
                <SidebarContents>
                    <SideBarLinks
                        icon={<NotebookText />}
                        text={"Offer"}
                        href={"/persSecretariat/"}
                    />

                    <SideBarLinks
                        icon={<BookUser />}
                        text={"Stagiaires"}
                        href={"/persSecretariat/interns"}
                    />

                    <SideBarLinks
                        icon={<Handshake />}
                        text={"Entretients"}
                        href={"/persSecretariat/interviews"}
                    />
                </SidebarContents>
                <div className={"h-full"}>
                    <Outlet />
                </div>
            </MereLayout>
        </>
    );
}

export default PersSecLayout;
