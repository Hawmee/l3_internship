import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { newOffre } from "../features/offres";
import PopUpContainer from "../components/containers/PopUpContainer";
import { setCurrentUser } from "../features/currentUser";
import axios from "axios";

function Authenticated() {
    const navigate = useNavigate();
    // const token = useSelector((state) => state.token.value);
    const socketurl = useSelector((state) => state.socketUrl.value);
    const user = useSelector((state) => state.currentUser.value);
    const url = useSelector((state)=>state.backendUrl.value)

    const socket = io(socketurl);
    const dispatch = useDispatch();

    const [message, setMessage] = useState(false);
    const logout = async()=>{
      try {
        const logged_out = await axios.post(`${url}/logout` , "logged_out" , {withCredentials :true})
        if (logged_out){
            dispatch(setCurrentUser(null))
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

        socket.on(`user_validated/${user.matricule}` , (data)=>{
            if(data){
                setMessage(true)
            }
        })

        return () => {
            socket.off("new_offre");
            socket.off(`user_validated/${user.id}`)
        };
    }, []);

    return (
        <>
            <div className="font-[Figtree] antialised ">
                <Outlet />
            </div>
            { message &&
              <PopUpContainer>
                    <div className="flex flex-col">
                        <div className={"text-[20px] mb-2"}>Compte confirmé</div>
                        <div className={"text-[18px] mb-3"}>Votre compte a été validé , veuillez vous reconnecter .</div>
                        <div className="flex flex-row justify-end">
                          <button className="bg-blue-500 py-1 px-6 rounded-[8px] text-white hover:bg-blue-600 " onClick={logout}>Ok</button>
                        </div>
                    </div>
              </PopUpContainer>
            }
        </>
    );
}

export default Authenticated;
