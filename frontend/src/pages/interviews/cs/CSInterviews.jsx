import React, { useEffect, useState } from "react";
import MainContainer from "../../../components/containers/MainContainer";
import SearchContainer from "../../../components/containers/SearchContainer";
import Table from "./Table";
import { useSelector } from "react-redux";
import TableEntretient from "./TableEntretient";
import { filterObjdiff, filterObjSame, include } from "../../../functions/Functions";
import { Filter, Search, Settings2 } from "lucide-react";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import Confirm from "./forms/Confirm";
import Cancel from "./forms/Cancel";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import Edit from "./forms/Edit";

function CSInterviews({interviews}) {
    const [navigation, setNavigation] = useState("Demande");
    const [interview_data, setInterview_data] = useState(interviews);
    const [searchTerm, setSearchTerm] = useState("");
    const [deny, setDeny] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [edit, setEdit] = useState(false);
    const [selected_interview , setSelected_interview] = useState(null)


    const methodConfirm = useForm()
    const methodEdit=useForm()


    const demand_CS = filterObjdiff(interview_data , 'date_interview')

    const demands_interv = filterObjSame(
        demand_CS,
        "status"
    );



    const handleConfirm = (item) => {
        setConfirm(!confirm);
        if(item){
            setSelected_interview(item)
        }
    };

    const handleEdit = (item) => {
        setEdit(!edit);
        if(item){
            setSelected_interview(item)
        }
    };

    const handleDeny = () => {
        setDeny(!deny);
    };

    const handleCancel = (item ) => {
        setCancel(!cancel);
        if(item){
            setSelected_interview(item)
        }
    };

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

    useEffect(()=>{
        if(demands_interv.length == 0 && !searchTerm){
            setNavigation("Entretient")
        }
    } , [demands_interv , searchTerm])

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
                                value={navigation}
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
                            onDeny={handleDeny}
                        />
                    )}
                    {navigation == "Entretient" && (
                        <TableEntretient
                            data={interviews}
                            onConfirm={handleConfirm}
                            onEdit={handleEdit}
                            onCancel={handleCancel}
                        />
                    )}
                </div>
            </MainContainer>
            {confirm && (
                <PopUpContainer popup={confirm} closePopUp={setConfirm}>
                    <Confirm method={methodConfirm} data ={selected_interview} handleConfirm={handleConfirm}/>
                </PopUpContainer>
            )}
            {edit && (
                <PopUpContainer popup={edit} closePopUp={setEdit}>
                    <Edit method={methodEdit} interview={selected_interview} handleEdit={handleEdit} />
                </PopUpContainer>
            )}
            {cancel && (
                <PopUpContainer popup={cancel} closePopUp={setCancel}>
                    <Cancel interview={selected_interview}  handleCancel={handleCancel} />
                </PopUpContainer>
            )}
        </>
    );
}

export default CSInterviews;
