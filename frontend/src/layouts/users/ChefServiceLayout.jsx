import React, { useEffect } from "react";
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
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { editAccount, newAccount, setAccounts } from "../../features/accounts";
import { setEntretient } from "../../features/entretient";
import { setStage } from "../../features/stage";
import { setAttestation } from "../../features/attestation";
import { io } from "socket.io-client";


function ChefServiceLayout() {

    const url= useSelector((state)=>state.backendUrl.value)
    const socketUrl = useSelector((state)=> state.socketUrl.value)
    const dispatch = useDispatch()
    const socket = io(socketUrl)

    const getAllAccounts= async ()=>{
        try {
            const accounts_response = await axios.get(`${url}/users`)
            const accounts = accounts_response.data
            if(Array.isArray(accounts)){
                dispatch(setAccounts(accounts))
            }
        } catch (error) {
            console.log(error);
            
        }
    }


    const getAllInterviews = async ()=>{
        try {
            const interviews_response = await axios.get(`${url}/entretient`)
            const interviews = interviews_response.data
            if(Array.isArray(interviews)){
                dispatch(setEntretient(interviews))
            }
        } catch (error) {
            console.log(error)
        }
    }


    const getAllAttestations = async ()=>{
        try{
            const attestation_response = await axios.get(`${url}/attestation`)
            const attestation = attestation_response.data
            if(Array.isArray(attestation)){
                dispatch(setAttestation(attestation))
            }
        }catch(error){
            console.log(error)
        }
    }


    const accounts = useSelector((state)=>state.account.value)
    const interviews = useSelector((state)=>state.entretient.value)
    const attestations =useSelector((state)=>state.attestation.value)
    const user = useSelector((state)=> state.currentUser.value)
    const navigate = useNavigate()


    const isNewAccounts = Array.isArray(accounts) && accounts.some(account => account.isNew === true)
    const isNewInterviews = (Array.isArray(interviews)? interviews.some(interv => interv.isNew) : false)
    const isNewInternShip = (Array.isArray(attestations)? attestations.some(attestation => attestation.isNew) : false)




    console.log(accounts)

    useEffect(()=>{
        getAllAccounts();
        getAllInterviews();
        getAllAttestations();
    } , [ dispatch])

    useEffect(()=>{
        socket.on("user_validated", (user)=>{
            dispatch(editAccount(user))
        })

        return()=>{
            socket.off("user_validated")
        }
    } , [socket])

    useEffect(()=>{
        if( !user.isChefService ){
            navigate('/guest/login')
        }
    },[user])

    return (
        <>
            <MereLayout>
                <SidebarContents>
                    <SideBarLinks
                        icon={<LayoutDashboard size={22} />}
                        text={"Dashboard"}
                        href={"/chefService/"}
                    />
                    <SideBarLinks
                        icon={<Handshake size={22} />}
                        text="Entretient"
                        href={"/chefService/interviews"}
                        alert={isNewInterviews}
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
                        alert={isNewAccounts}
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
