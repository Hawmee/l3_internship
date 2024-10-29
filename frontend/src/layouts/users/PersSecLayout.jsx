// import React from 'react'
import MereLayout from "../MereLayout";
import SidebarContents from "../../components/SidebarContent.jsx";
import { SideBarLinks } from "../../components/Sidebar.jsx";
import { BookUser, Handshake, NotebookText } from "lucide-react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setStagiaire } from "../../features/stagiaire.js";
import { useEffect } from "react";

function PersSecLayout() {
    const dispatch = useDispatch();
    const url = useSelector((state) => state.backendUrl.value);

    const getAllStagiaires = async () => {
        try {
            const stagiaires_data = await axios.get(`${url}/stagiaire`);
            const stagiaires = stagiaires_data.data;
            if (Array.isArray(stagiaires) && stagiaires.length > 0) {
                dispatch(setStagiaire(stagiaires));
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(()=>{
      getAllStagiaires()
    } , [dispatch])

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
