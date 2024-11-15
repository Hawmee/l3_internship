import React from "react";
import PassWord from "../forms/PassWord";

function Password() {
    return (
        <div className="flex flex-col items-start px-4 py-4 w-full border-2 border-gray-300 rounded-lg">
            <div className="underline underline-offset-4">
                MOTS DE PASSE:
            </div>
            <div className="mt-3">
                    <PassWord />
            </div>
        </div>
    );
}

export default Password;
