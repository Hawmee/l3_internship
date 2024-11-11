import {
    BookUser,
    ClipboardList,
    Handshake,
    LayoutDashboard,
    NotebookText,
} from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { SideBarLinks } from "../../components/Sidebar";
import SidebarContents from "../../components/SidebarContent";
import MereLayout from "../MereLayout";
import axios from "axios";
import { setTache } from "../../features/tache";
import { addDays, isBefore, isWithinInterval, parse, parseISO } from "date-fns";
import { isArrayNotNull } from "../../functions/Functions";
import { task_observations } from "../../utils/Observations";

function ChefUnitLayout() {
    const user = useSelector((state) => state.currentUser.value);
    const url = useSelector(state=>state.backendUrl.value)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const today = new Date()

    const getAlltasks = async ()=>{
        try {
            const tasks_response = await axios.get(`${url}/tache`)
            const tasks = tasks_response.data
            dispatch(setTache(tasks))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getAlltasks()
    } , [url , dispatch])


    const task = useSelector(state=>state.tache.value)
    const tasks = isArrayNotNull(task) ? task.filter(item=>item.stage) : []

    const almostDeadlineTasks = tasks ? tasks.some(item=>{
        const dateFin =  parseISO(item.date_fin)
        const interval = {start: today , end: addDays(today , 3)}
        const is_not_finished = !item.status
        return isWithinInterval(dateFin , interval) && is_not_finished
    }) : false


    const unfinishedTasks = tasks ? tasks.find(item=>{
        const dateFin = parseISO(item.date_fin)
        const encours = item.observation == task_observations.en_cours
        return isBefore(dateFin,today) && encours
    }) : false



    const unfinished = async()=>{
        try {
            const unfinished = await axios.patch(`${url}/taches/unfinished/`)
            if(unfinished){
                console.log('unfinished updated');                
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(()=>{
        if(tasks && unfinishedTasks){
            unfinished()
        }
    } , [unfinishedTasks , tasks])


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
                        alert={almostDeadlineTasks}
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
