import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import PopUpContainer from "../components/containers/PopUpContainer";
import { setCurrentUser } from "../features/currentUser";
import { deleteEntretient, editEntretient, newEntretient, setEntretient } from "../features/entretient";
import { deleteOffre, editOffre, newOffre, setOffre } from "../features/offres";
import Socket from "../features/Socket";
import { editStage, newStage, setStage } from "../features/stage";
import { deleteStagiaire, editStagiaire, newStagiaire, setStagiaire } from "../features/stagiaire";
import { isArrayNotNull } from "../functions/Functions";
import { newPerf, setPerf } from "../features/perf";
import { editAttestation, newAttestation } from "../features/attestation";

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


    const getAllInternShips = async()=>{
        try {
            const stages_data = await axios.get(`${url}/stage`)
            const stages = stages_data.data
            if(isArrayNotNull(stages)){
                dispatch(setStage(stages))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getAllInterviews = async()=>{
        try {
            const interviews_data = await axios.get(`${url}/entretient`)
            const interviews = interviews_data.data
            if(isArrayNotNull(interviews)){
                dispatch(setEntretient(interviews))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getAllInterns = async()=>{
        try {
            const interns_data = await axios.get(`${url}/stagiaire`)
            const interns = interns_data.data
            if(isArrayNotNull(interns)){
                dispatch(setStagiaire(interns))
            }
        } catch (error) {
            console.log(erreur);
        }
    }

    const getAllOffres = async()=>{
        try {
            const offres_data = await axios.get(`${url}/offre`)
            const offres = offres_data.data
            if(isArrayNotNull(offres)){
                dispatch(setOffre(offres))
            }
        } catch (error) {
            console.log(error);
            
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

        socket.on('new_entretient' , interview=>{
            dispatch(newEntretient(interview))
        })

        socket.on('new_stagiaire' , intern=>{
            dispatch(newStagiaire(intern))
        })

        socket.on('new_stage' , stage=>{
            dispatch(newStage(stage))
        })


        socket.on('new_perf' , perf=>{
            dispatch(newPerf(perf))
        })

        socket.on('new_attestation' , attestation=>{
            dispatch(newAttestation(attestation))
        })


        
        socket.on('updated_offre' , offre=>{
            dispatch(editOffre(offre))
        })


        socket.on('updated_performance' , performance =>{
            dispatch(setPerf(performance))
        })

        socket.on('updated_entretient' , entretient=>{
            dispatch(editEntretient(entretient))            
        })

        socket.on('update_stagiaire', stagiaire=>{
            dispatch(editStagiaire(stagiaire))
        })

        socket.on('updated_stage', stage=>{
            dispatch(editStage(stage))
        })

        socket.on('updated_attestation' , attestation=>{
            dispatch(editAttestation(attestation))
        })




        socket.on('deleted_stagiaire', (id) =>{
            dispatch(deleteStagiaire(Number(id)))
            // console.log(id)
        })
        socket.on('deleted_offre' ,id =>{
            dispatch(deleteOffre(Number(id)))
        })
        socket.on('deleted_entretient' ,id =>{
            dispatch(deleteEntretient(Number(id)))
        })

        return () => {
            socket.off("new_offre");
            if(user){
                socket.off(`user_validated/${user.matricule}`);
            }

            socket.off('new_entretient')
            socket.off('new_stagiaire')
            socket.off('new_stage')
            socket.off('new_perf')
            socket.off('new_attestation')
            socket.off('updated_offre')
            socket.off('updated_performance')
            socket.off('updated_entretient')
            socket.off('update_stagiaire')
            socket.off('updated_stage')
            socket.off('updated_attestation')
            socket.off('deleted_stagiaire')
            socket.off('deleted_offre')
            socket.off('deleted_entretient')


    
        };
    }, [dispatch, socket]);


    useEffect(()=>{
        getAllInterns()
        getAllInternShips()
        getAllInterviews()
        getAllOffres()
    }, [dispatch])

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
