import React from "react";
import Account from "../forms/Account";

function Compte() {
    return (
        <div className="flex flex-col items-start px-4 py-4 w-full border-2 border-gray-300  rounded-lg">
            <div className="underline underline-offset-4">
                COMPTE :
            </div>
            <div className="mt-3">
                    <Account />
            </div>
        </div>
    );
}

export default Compte;
