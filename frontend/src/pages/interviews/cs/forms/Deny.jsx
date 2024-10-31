import React from "react";
import { FormProvider } from "react-hook-form";
import Input from "../../../../components/forms/Input";

function Deny({ method }) {
    return (
        <>
            <div className="flex flex-col min-w-[25vw]">
                <div className="mb-4 text-[18px]">Refus de l'entretient</div>
                <div>
                    <FormProvider {...method}>
                        <form action="">
                            <div className="mb-3">
                                <Input
                                    label={"Motif du refus"}
                                    name={"observation"}
                                    validation={{ 
                                        require:"Valeure Requise"
                                     }}
                                />
                            </div>

                            <div className="flex flex-row justify-end mt-6">
                                <button className="bg-blue-500 text-white px-4 py-1 rounded-[8px] hover:bg-blue-600">
                                    Valider
                                </button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </>
    );
}

export default Deny;
