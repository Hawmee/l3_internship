import React, { useEffect, useState } from "react";
import MainContainer from "../../../components/containers/MainContainer";
import SearchContainer from "../../../components/containers/SearchContainer";
import Table from "./Table";
import { useSelector } from "react-redux";
import TableEntretient from "./TableEntretient";
import { filterObjdiff, filterObjSame, include } from "../../../functions/Functions";
import { Filter, Search, Settings2 } from "lucide-react";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import Affirm from "./forms/Affirm";
import Confirm from "./forms/Confirm";
import Cancel from "./forms/Cancel";
import Deny from "./forms/Deny";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

function CSInterviews() {
    const interviews = useSelector((state) => state.entretient.value);
    const [navigation, setNavigation] = useState("Demande");
    const [interview_data, setInterview_data] = useState(interviews);
    const [searchTerm, setSearchTerm] = useState("");
    const [deny, setDeny] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [affirm, setAffirm] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [edit, setEdit] = useState(false);
    const [selected_interview , setSelected_interview] = useState(null)


    const methodAffirm = useForm()
    const methodDeny = useForm()
    const methodConfirm = useForm()
    const methodEdit=useForm()
    const methodCancel=useForm()


    const demands_interv = filterObjdiff(
        interview_data,
        "date_interview"
    );
    const affirmed_interv = filterObjSame(
        interview_data,
        "date_interview",
    );

    const handleAffirm = (interview) => {
        setAffirm(!affirm);
        setSelected_interview(interview)
    };

    const handleConfirm = () => {
        setConfirm(!confirm);
    };

    const handleEdit = () => {
        setEdit(!edit);
    };

    const handleDeny = () => {
        setDeny(!deny);
    };

    const handleCancel = () => {
        setCancel(!cancel);
    };


    useEffect(()=>{
        console.log("modifié");
    } , [interviews])

    useEffect(() => {
        const searched_data =
            searchTerm == ""
                ? interviews
                : interviews.filter((interview) => {
                      const offreName = interview.offre.nom.toLowerCase();
                      const uniteName = interview.offre.unite.nom.toLowerCase();
                      const stagiairePrenom =
                          interview.stagiaire.prenom.toLowerCase();
                      const stagiaireNomPrenom = `${interview.stagiaire.nom.toLowerCase()} ${stagiairePrenom}`;
                      const dateInterview = interview.date_interview
                          ? format(interview.date_interview.toLowerCase(),"dd/MM/yyyy")
                          : "";

                      return (
                          include(offreName, searchTerm.toLocaleLowerCase()) ||
                          include(uniteName, searchTerm.toLowerCase()) ||
                          include(
                              stagiaireNomPrenom,
                              searchTerm.toLowerCase()
                          ) ||
                          include(stagiairePrenom, searchTerm.toLowerCase()) ||
                          include(dateInterview, searchTerm.toLowerCase())
                      );
                  });

        setInterview_data(searched_data);
    }, [searchTerm, interviews]);

    return (
        <>
            <MainContainer>
                <SearchContainer>
                    <div className="flex flex-row w-full h-full items-center justify-between ">
                        <div className="min-w-56 flex flex-row justify-center items-end h-full">
                            <select
                                name=""
                                id=""
                                className="px-2 py-1 border-[2px] border-gray-400  rounded-[12px] cursor-pointer outline-none"
                                onChange={(e) => setNavigation(e.target.value)}
                            >
                                <option value="Demande">
                                    Demande d'entretient
                                </option>
                                <option value="Entretient">Entretient</option>
                            </select>
                        </div>

                        <div className=" flex flex-row flex-1 h-full justify-end items-end ">
                            <div className="flex flex-row  text-gray-600 py-1 rounded-[12px] bg-gray-200 px-2">
                                <input
                                    type="text"
                                    placeholder="Rechercher(offre , stagiaire , date)"
                                    className="w-64 bg-transparent outline-none placeholder:text-gray-500 px-1"
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                    }}
                                />
                                <div className="mr-1  px-1 flex flex-row items-center cursor-pointer">
                                    <Search size={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                </SearchContainer>
                <div className="h-full">
                    {navigation == "Demande" && (
                        <Table
                            data={demands_interv}
                            onAffirm={handleAffirm}
                            onDeny={handleDeny}
                        />
                    )}
                    {navigation == "Entretient" && (
                        <TableEntretient
                            data={affirmed_interv}
                            onConfirm={handleConfirm}
                            onEdit={handleEdit}
                            onCancel={handleCancel}
                        />
                    )}
                </div>
            </MainContainer>
            {affirm && (
                <PopUpContainer popup={affirm} closePopUp={setAffirm}>
                    {" "}
                    <Affirm method={methodAffirm} interview={selected_interview} />
                </PopUpContainer>
            )}
            {confirm && (
                <PopUpContainer popup={confirm} closePopUp={setConfirm}>
                    <Confirm method={methodConfirm}/>
                </PopUpContainer>
            )}
            {edit && (
                <PopUpContainer popup={edit} closePopUp={setEdit}>
                    <Edit method={methodEdit} />
                </PopUpContainer>
            )}
            {cancel && (
                <PopUpContainer popup={cancel} closePopUp={setCancel}>
                    <Cancel method={methodCancel} />
                </PopUpContainer>
            )}
            {deny && (
                <PopUpContainer popup={deny} closePopUp={setDeny}>
                    <Deny method={methodDeny} />
                </PopUpContainer>
            )}
        </>
    );
}

export default CSInterviews;
