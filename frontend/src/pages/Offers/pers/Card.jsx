import {differenceInMonths} from "date-fns";
import {CalendarPlus, Trash2} from "lucide-react";
import { isArray } from "../../../functions/Functions";

// eslint-disable-next-line react/prop-types
function Card({data , handleCreateInterview}) {
    return (
        <>
            <div className="card card mr-2 flex flex-col px-12 mt-2 h-[75vh] overflow-auto">
                {/* eslint-disable-next-line react/prop-types */}
                {isArray(data) && data.map(offre => (
                    <div
                        className="relative bg-gray-100 flex flex-row min-h-[15vh] rounded-[12px] px-6 py-3 mb-3 text-[17px]"
                        key={offre.id}>
                        <div className="flex flex-col flex-1">
                            <div className="mb-4">Nom: {offre.nom}</div>
                            <div>Theme: {offre.theme}</div>
                        </div>

                        <div className="flex flex-col flex-1">
                            <div className="mb-4">duree: {differenceInMonths(offre.date_fin, offre.date_debut)} mois
                            </div>
                            {offre.unite && <div>Division: {offre.unite.nom}</div>}
                        </div>

                        <div className="flex flex-col justify-end mt-12 mr-2">
                            <div className="flex flex-row items-center justify-center">
                                <div className="relative group">
                                    <button className="mr-4 text-blue-500" onClick={()=>{handleCreateInterview(offre)}}>
                                        <CalendarPlus size={22} strokeWidth={2.2}/>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}

                <div className=" p-8">{""}</div>

            </div>
        </>
    );
}

export default Card;