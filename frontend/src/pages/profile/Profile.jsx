import React from "react";
import MereLayout from "../../layouts/MereLayout";
import MainContainer from "../../components/containers/MainContainer";
import Personal_info from "./parts/Personal_info";
import Password from "./parts/Password";
import Compte from "./parts/Compte";

function Profile() {
    return (
        <>
            <div className="py-3 mx-8">
                <MainContainer>
                    <div className="text-center text-gray-700">
                        <div className="text-xl underline underline-offset-4">
                            PROFILE
                        </div>
                    </div>
                    <div className="h-[80vh] mt-6 flex flex-col items-center text-gray-600">
                        <div className="mb-4 w-full">
                            <Personal_info />
                        </div>
                        <div className="mb-4 w-full">
                            <Compte />
                        </div>
                        <div className="mb-4 w-full">
                            <Password />
                        </div>
                    </div>
                </MainContainer>
            </div>
        </>
    );
}

export default Profile;
