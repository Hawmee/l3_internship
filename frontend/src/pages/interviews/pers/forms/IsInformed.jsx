import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function IsInformed({ handleInform, data }) {

    const url = useSelector(state=>state.backendUrl.value)
    const toastconfig = useSelector(state=>state.toastConfig.value)
    const id = Number(data.id)

    const submit = async()=>{
        try {
            const informed = await axios.patch(`${url}/informed/${id}`)
            if(informed){
                const message = "Action reussite!"
                handleInform()
                toast.success(message , toastconfig)
            }        
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div clasName="flex flex-row">
                <div className="text-[20px] mb-4">Stagiaire informé</div>
                <div className="text-[19px] mb-4">
                    Voulez-vous vraiment pursuivre cette action ?
                </div>
                <div className=" flex flex-row justify-end text-white">
                    <button className="bg-gray-500 hover:bg-gray-600 py-1 px-4 rounded-[8px] mr-2" onClick={()=>{handleInform()}}>
                        Annuler
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-600 py-1 px-4 rounded-[8px]" onClick={()=>{submit()}}>
                        Valider
                    </button>
                </div>
            </div>
        </>
    );
}

export default IsInformed;
