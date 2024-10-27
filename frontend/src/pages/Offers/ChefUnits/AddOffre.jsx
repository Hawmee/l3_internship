import React from "react";
import Form from "../../../components/forms/Form";
import { addMonths, format, startOfToday } from "date-fns";
import Input from "../../../components/forms/Input";
import DatePicker from "../../../components/forms/DatePicker";
import axios from "axios";
import { useSelector } from "react-redux";

function AddOffre({unite_id , handleAdd}) {
    const url = useSelector((state)=>state.backendUrl.value)
    const defaultDateTime = format(startOfToday(), "yyyy-MM-dd'T'00:00");
    const today_date = startOfToday()
    const today = format(today_date, "yyyy-MM-dd'T'HH:mm");
    const afterMonth = format(addMonths(today_date , 1) , "yyyy-MM-dd'T'HH:mm")

    const add = async(data)=>{
        try {
            const added_offre = await axios.post(`${url}/offre` ,data)
            if(added_offre){
                console.log(added_offre);
                handleAdd()   
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    const onSubmit = (data) => {
        const offre_data = {
            ...data,
            date_debut: format(data.date_debut , "yyyy-MM-dd'T'HH:mm:ss.000'Z") ,
            date_fin: format(data.date_fin , "yyyy-MM-dd'T'HH:mm:ss.000'Z") ,
            unite_id:Number(unite_id)
        }

        add(offre_data)
        // console.log(offre_data);
        
        
    };

    return (
        <>
            <Form onSubmit={onSubmit}>
                <div className="w-60 flex flex-col">
                    <div className="text-[19px] text-center">
                        Nouvelle Offre
                    </div>
                    <div className="mt-4">
                        <Input
                            label={"Offre"}
                            name={"nom"}
                            validation={{
                                required: "Valeur requise",
                            }}
                        />
                    </div>

                    <div className="mt-2">
                        <Input
                            label={"Theme"}
                            name={"theme"}
                            validation={{
                                required: "Valeur requise",
                            }}
                        />
                    </div>

                    <div className="mt-2">
                        <Input
                            label={"Competence requise"}
                            name={"competence_requis"}
                            validation={{
                                required: "Valeur requise",
                            }}
                        />
                    </div>

                    <div className="mt-2">
                        <DatePicker
                            label={"Date debut :"}
                            name={"date_debut"}
                            validation={{
                                required: "Valeur requise",
                            }}
                            type="datetime-local"
                            defaultValue={today}
                            min={today}
                        />
                    </div>

                    <div className="mt-2">
                        <DatePicker
                            label={"Date fin :"}
                            name={"date_fin"}
                            validation={{
                                required: "Valeur requise",
                            }}
                            type="datetime-local"
                            defaultValue={afterMonth}
                            min={afterMonth}
                        />
                    </div>

                    <div className="flex flex-row justify-end">
                        <button className="mt-6 text-white bg-blue-500 px-3 py-1 rounded-[8px]" type="submit">
                            Valider
                        </button>
                    </div>
                </div>
            </Form>
        </>
    );
}

export default AddOffre;
