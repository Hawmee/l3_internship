import { useEffect } from "react";
import SidebarContents from "../../components/SidebarContent";
import {
    BookUser,
    FileText,
    GraduationCap,
    Handshake,
    NotebookText,
} from "lucide-react";
import MereLayout from "../MereLayout";
import { SideBarLinks } from "../../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isArray } from "../../functions/Functions";
import axios from "axios";
import { setAttestation } from "../../features/attestation";

function PersCelluleLayout() {
    const url = useSelector((state) => state.backendUrl.value);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.currentUser.value);
    const attestations = useSelector((state) => state.attestation.value);
    const interns = useSelector((state) => state.stagiaire.value);
    const interviews = useSelector((state) => state.entretient.value);
    const navigate = useNavigate();

    const getAllAttestations = async () => {
        try {
            const attestation_response = await axios.get(`${url}/attestation`);
            const attestation = attestation_response.data;
            if (isArray(attestation)) {
                dispatch(setAttestation(attestation));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const isNewInterviews =
        isArray(interviews) &&
        interviews.some(
            (interview) => interview.isNew && interview.date_interview
        );
    const isNewAttestation =
        isArray(attestations) &&
        attestations.some(
            (attestation) => attestation.isNew && attestation.status
        );
    useEffect(() => {
        if (user && !user.isPersCellule) {
            navigate("/guest/login");
        }
    }, [user]);

    useEffect(() => {
        // getAllAttestations();
    }, [dispatch]);

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
                        icon={<Handshake size={22} />}
                        text={"Entretients"}
                        href={"/persCellule/interviews"}
                        alert={isNewInterviews}
                    />
                    <SideBarLinks
                        icon={<FileText size={22} />}
                        text={"Livrables"}
                        href={"/persCellule/attestation"}
                        alert={isNewAttestation}
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
