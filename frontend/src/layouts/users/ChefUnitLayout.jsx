import {
    BookUser,
    ClipboardList,
    Handshake,
    NotebookText,
} from "lucide-react";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { SideBarLinks } from "../../components/Sidebar";
import SidebarContents from "../../components/SidebarContent";
import MereLayout from "../MereLayout";
import axios from "axios";
import { setTache } from "../../features/tache";
import {
    addDays,
    isBefore,
    isWithinInterval,
    parseISO,
    startOfDay,
} from "date-fns";
import { isArrayNotNull } from "../../functions/Functions";
import { task_observations } from "../../utils/Observations";

function ChefUnitLayout() {
    const user = useSelector((state) => state.currentUser.value);
    const url = useSelector((state) => state.backendUrl.value);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const task = useSelector((state) => state.tache.value);
    const [almostDeadlineTasks, setAlmostDeadLine] = useState(false);
    const [unfinishedTasks, setUnfinishedTasks] = useState(false);

    const getAlltasks = async () => {
        try {
            const tasks_response = await axios.get(`${url}/tache`);
            const tasks = tasks_response.data;
            dispatch(setTache(tasks));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (task) {
            // Get all tasks, not just filtered ones
            const tasks = Array.isArray(task) ? task : [];
            console.log("All tasks:", tasks);

            const today = startOfDay(new Date());
            
            // Check for almost deadline tasks
            const almostDeadline = tasks.some(item => {
                if (!item.date_fin) return false;
                const dateFin = parseISO(item.date_fin);
                const interval = { start: today, end: addDays(today, 3) };
                const isNearDeadline = isWithinInterval(dateFin, interval) && !item.status;
                
                return isNearDeadline;
            });

            // Check for unfinished tasks
            const unfinished = tasks.some(item => {
                if (!item.date_fin) return false;
                const dateFin = parseISO(item.date_fin);
                const encours = item.observation === task_observations.en_cours;
                return isBefore(dateFin, today) && encours;
            });

            console.log("Status updates:", { almostDeadline, unfinished });
            setAlmostDeadLine(almostDeadline);
            setUnfinishedTasks(unfinished);
        }
    }, [task]);

    const unfinished = async () => {
        try {
            await axios.patch(`${url}/taches/unfinished/`);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (unfinishedTasks) {
            unfinished();
        }
    }, [unfinishedTasks]);

    useEffect(() => {
        if (user && !user.isChefUnit) {
            navigate("/guest/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        getAlltasks();
    }, [url]);

    return (
        <MereLayout>
            <SidebarContents>
                <SideBarLinks
                    icon={<NotebookText size={22} />}
                    text="Offres"
                    href="/chefUnits/"
                />
                <SideBarLinks
                    icon={<Handshake size={22} />}
                    text="Entretiens"
                    href="/chefUnits/interviews"
                />
                <SideBarLinks
                    icon={<BookUser size={22} />}
                    text="Stagiaires"
                    href="/chefUnits/interns"
                />
                <SideBarLinks
                    icon={<ClipboardList size={22} />}
                    text="Taches"
                    href="/chefUnits/tasks"
                    alert={almostDeadlineTasks}
                />
            </SidebarContents>
            <div className="h-full">
                <Outlet />
            </div>
        </MereLayout>
    );
}

export default ChefUnitLayout;