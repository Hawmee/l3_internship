import { useEffect } from "react";
import SidebarContents from "../../components/SidebarContent";
import {BookUser, FileText, GraduationCap, Handshake, NotebookText} from "lucide-react";
import MereLayout from "../MereLayout";
import { SideBarLinks } from "../../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isArray } from "../../functions/Functions";

function PersCelluleLayout() {
    const user = useSelector((state) => state.currentUser.value);
    const interns = useSelector(state=>state.stagiaire.value)
    const interviews = useSelector(state=>state.entretient.value)
    const navigate = useNavigate();


    const isNewInterviews = isArray(interviews) && interviews.some(interview=>(interview.isNew == true && interview.date_interview))
    console.log(isNewInterviews)


    useEffect(() => {
        if (user && !user.isPersCellule) {
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
                        alert={isNewInterviews}
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
