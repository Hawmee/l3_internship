import {FormProvider} from "react-hook-form";
import Input from "../../../components/forms/Input.jsx";
import Select from "../../../components/forms/Select.jsx";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
function AddInterview({method}) {

    const [newIntern , setNewIntern] = useState(false)

    const handleNewIntern = () => {
        setNewIntern(!newIntern)
    }

    return (
        <>
            <div className={"w-96 flex flex-col"}>
                <div className={"mb-4 text-[18px]"}>Nouvel Entretient :</div>
                <div>
                    <FormProvider {...method}>
                        <form>
                            <div className={"mb-3"}>
                                <Select
                                    label="Offre"
                                    name={"offre"}
                                    type="text"
                                    className={"border-[2px] border-gray-400 rounded-[8px] p-2"}
                                />
                            </div>

                            {!newIntern ?
                                <div className={"flex flex-row items-end"}>
                                    <div className={"flex-1 mr-2"}>
                                        <Select
                                            label="Offre"
                                            name={"offre"}
                                            type="text"
                                            className={"border-[2px] border-gray-400 rounded-[8px] p-2"}
                                        />
                                    </div>

                                    <div><button className={"bg-blue-500 p-2 text-white rounded-[8px] hover:bg-blue-600"} type={"button"} onClick={handleNewIntern}>Nouveau Stagiaire</button></div>
                                </div>
                                :
                                <div>pepeta</div>
                            }
                        </form>
                    </FormProvider>
                </div>
            </div>
        </>
    );
}

export default AddInterview;