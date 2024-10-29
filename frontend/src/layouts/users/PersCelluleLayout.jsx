import { useEffect } from "react";
import SidebarContents from "../../components/SidebarContent";
import {BookUser, FileText, GraduationCap, Handshake, NotebookText} from "lucide-react";
import MereLayout from "../MereLayout";
import { SideBarLinks } from "../../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setStagiaire } from "../../features/stagiaire";

function PersCelluleLayout() {
    const user = useSelector((state) => state.currentUser.value);
    const url = useSelector((state) => state.backendUrl.value);
    const dispatch = useDispatch()

    const navigate = useNavigate();


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

    useEffect(() => {
        if (user && !user.isPersCellule) {
            navigate("/guest/login");
        }
    }, [user]);


    useEffect(()=>{
        getAllStagiaires()
    } , [dispatch])

    return (
        <>
            <MereLayout>
                <SidebarContents>
                    <SideBarLinks
                        icon={<NotebookText size={22} />}
                        text={"Offres"}
                        href={"/persCellule/"}
                    />

                    <SideBarLinks
                        icon={<BookUser size={22} />}
                        text={"Stagiaires"}
                        href={"/persCellule/interns"}
                    />
                    <SideBarLinks
                        icon={<GraduationCap />}
                        text = "Stages"
                        href={"/persCellule/internships"}
                    />
                    <SideBarLinks
                        icon={<Handshake size={22} />}
                        text={"Entretients"}
                        href={"/persCellule/interviews"}
                    />
                    <SideBarLinks
                        icon={<FileText size={22} />}
                        text={"Attestation"}
                        href={"/persCellule/attestation"}
                    />
                </SidebarContents>
                <div className="h-full">
                    <Outlet />
                </div>
            </MereLayout>
        </>
    );
}

export default PersCelluleLayout;
