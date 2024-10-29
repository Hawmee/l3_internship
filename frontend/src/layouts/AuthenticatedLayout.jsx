import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { newOffre } from "../features/offres";
import PopUpContainer from "../components/containers/PopUpContainer";
import { setCurrentUser } from "../features/currentUser";
import axios from "axios";
import { setStagiaire } from "../features/stagiaire";
import Socket from "../features/Socket";

function Authenticated() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.currentUser.value);
    const url = useSelector((state) => state.backendUrl.value);
    const socket = Socket
    const dispatch = useDispatch();
    const [message, setMessage] = useState(false);

    
    
    const logout = async () => {
        try {
            const logged_out = await axios.post(`${url}/logout`, "logged_out", {
                withCredentials: true,
            });
            if (logged_out) {
                dispatch(setCurrentUser(null));
            }
        } catch (error) {
            console.log(error);
        }
    };


    const getAllInterviews = async()=>{
        try {
            const interviews_data = await axios.get(`${url}/entretient`)
            const interviews = interviews_data.data
        } catch (error) {
            console.log(error)
        }
    }

    const getAllInterns = async()=>{
        try {
            
        } catch (error) {
            
        }
    }


    useEffect(() => {
        if (!user) {
            navigate("/guest/login");
        } else {
            if (user.isChefService) {
                navigate("/chefService/");
            } else if (user.isChefUnit) {
                navigate("/chefUnits/");
            } else if (user.isPersCellule) {
                navigate("/persCellule/");
            } else if (user.isPersSecretariat) {
                navigate("/persSecretariat/");
            }
        }

        console.log(user);
    }, [user]);

    useEffect(() => {

        console.log(user);
        

        socket.on("new_offre", (offre) => {
            dispatch(newOffre(offre));
            // console.log("lol lsi");
        });

        if(user){
            socket.on(`user_validated/${user.matricule}`, (data) => {
                if (data) {
                    setMessage(true);
                }
            });    
        }

        return () => {
            socket.off("new_offre");
            if(user){
                socket.off(`user_validated/${user.matricule}`);
            }
        };
    }, [dispatch, socket]);

    return (
        <>
            <div className="font-[Figtree] antialised ">
                <Outlet />
            </div>
            {message && (
                <PopUpContainer>
                    <div className="flex flex-col">
                        <div className={"text-[20px] mb-2"}>
                            Compte confirmé
                        </div>
                        <div className={"text-[18px] mb-3"}>
                            Votre compte a été validé , veuillez vous
                            reconnecter .
                        </div>
                        <div className="flex flex-row justify-end">
                            <button
                                className="bg-blue-500 py-1 px-6 rounded-[8px] text-white hover:bg-blue-600 "
                                onClick={logout}
                            >
                                Ok
                            </button>
                        </div>
                    </div>
                </PopUpContainer>
            )}
        </>
    );
}

export default Authenticated;
