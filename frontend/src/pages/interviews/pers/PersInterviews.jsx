import axios from "axios";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import MainContainer from "../../../components/containers/MainContainer";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import SearchContainer from "../../../components/containers/SearchContainer";
import { isArray } from "../../../functions/Functions";
import IsInformed from "./forms/IsInformed";
import Mail from "./forms/Mail";
import Table from "./Table";

function PersInterviews({ interviews }) {
    const url = useSelector((state) => state.backendUrl.value);
    const isNewInterviews =
        isArray(interviews) &&
        interviews.some(
            (interview) => interview.isNew == true && interview.date_interview
        );
    const [mail, setMail] = useState(false);
    const [inform, setInform] = useState(false);
    const [selected, setSelected] = useState(null);
    const methodMail = useForm();

    const handleMail = (item) => {
        setMail(!mail);
        if (item) {
            setSelected(item);
        }
    };

    const handleInform = (item) => {
        setInform(!inform);
        if (item) {
            setSelected(item);
        }
    };

    const nonInformed_interv = interviews.filter(
        (interview) => interview.date_interview
    );

    const mark_viewed = async () => {
        try {
            const viewed = await axios.patch(`${url}/markviewed/entretient`);
            if (viewed) {
                console.log("VIewed");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isNewInterviews) {
            setTimeout(() => {
                mark_viewed();
            }, 5000);
        }
    }, [isNewInterviews]);

    return (
        <>
            <MainContainer>
                <SearchContainer>
                    <div className="flex flex-row w-full h-full items-center justify-between pb-2 mt-6 border-b-[2px] mb-4">
                        <div className="min-w-56 flex flex-row justify-center items-end h-full">
                            <select
                                name=""
                                id=""
                                className="px-2 py-2 border-[2px] border-gray-400  rounded-[12px] cursor-pointer outline-none"
                                // value={navigation}
                                // onChange={(e) => setNavigation(e.target.value)}
                            >
                                <option value="Demande">
                                    Demande d'entretient
                                </option>
                                <option value="Entretient">Entretient</option>
                            </select>
                        </div>

                        <div className=" flex flex-row flex-1 h-full justify-end items-end ">
                            <div className="flex flex-row  text-gray-600 py-2 rounded-[12px] bg-gray-200 px-2">
                                <input
                                    type="text"
                                    placeholder="Rechercher(offre , stagiaire , date)"
                                    className="w-64 bg-transparent outline-none placeholder:text-gray-500 px-1"
                                    // onChange={(e) => {
                                    //     setSearchTerm(e.target.value);
                                    // }}
                                />
                                <div className="mr-1  px-1 flex flex-row items-center cursor-pointer">
                                    <Search size={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                </SearchContainer>
                <div>
                    <Table
                        data={nonInformed_interv}
                        onMail={handleMail}
                        onInform={handleInform}
                    />
                </div>
            </MainContainer>
            {mail && (
                <PopUpContainer popup={mail} closePopUp={setMail}>
                    <Mail
                        handleMail={handleMail}
                        method={methodMail}
                        data={selected}
                    />
                </PopUpContainer>
            )}
            {inform && (
                <PopUpContainer popup={inform} closePopUp={setInform}>
                    <IsInformed handleInform={handleInform} data={selected} />
                </PopUpContainer>
            )}
        </>
    );
}

export default PersInterviews;
