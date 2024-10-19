import React, { useState } from "react";
import Form from "../../components/forms/Form";
import Input from "../../components/forms/Input";
import Select from "../../components/forms/Select";
import { NavLink } from "react-router-dom";

function Register() {
    const onSubmit = (data) => {
        const data_end = {
            ...data,
            isChefService: data.role === "isChefService",
            isChefUnit: data.role === "isChefUnit",
            isPersCellule: data.role === "isPersCellule",
            isPersSecretariat: data.role === "isPersSecretariat",
        };

        delete data_end.role;

        console.log("form data : ", data_end);
    };

    const [units, setUnits] = useState([
        { id: 1, mail: "mail@mail.te", name: "idk" },
    ]);

    const unitOptions = [
        { value: "", label: "Unites de travails" },
        ...units.map((unit) => ({ value: unit.id, label: unit.name })),
    ];

    return (
        <>
            <div className="h-full w-full bg-gray-200 flex flex-col justify-center items-center">
                <div className="bg-white rounded p-4 min-w-[30vw]">
                    <Form onSubmit={onSubmit}>
                        <div className="mt-6">
                            <Input
                                label={"Matricule"}
                                name={"matricule"}
                                type="text"
                                validation={{
                                    required: "Valeur requise .",
                                    maxLength: {
                                        value: 50,
                                        message:
                                            "Trop long , veuillez redefinir",
                                    },
                                    pattern: {
                                        value: /^\d+$/,
                                        message: "valeur inappropriée ",
                                    },
                                    validate: {
                                        pasSeulementEspace: (value) => {
                                            value.trim() !== "" ||
                                                "Valeur requise.";
                                        },
                                    },
                                }}
                            />
                        </div>

                        <div className="mt-2">
                            <Input
                                label={"Nom"}
                                name={"nom"}
                                type="text"
                                validation={{
                                    required: "Valeur requise .",
                                    maxLength: {
                                        value: 50,
                                        message:
                                            "Trop long , veuillez redefinir",
                                    },
                                    pattern: {
                                        value: /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/,
                                        message: "valeur innappropriée ",
                                    },
                                    validate: {
                                        pasSeulementEspace: (value) => {
                                            value.trim() !== "" ||
                                                "Valeur requise.";
                                        },
                                    },
                                }}
                            />
                        </div>

                        <div className="mt-2">
                            <Input
                                label={"Prenom"}
                                name={"prenom"}
                                type="text"
                                validation={{
                                    required: "Valeur requise .",
                                    maxLength: {
                                        value: 50,
                                        message:
                                            "Trop long , veuillez redefinir",
                                    },
                                    pattern: {
                                        value: /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/,
                                        message:
                                            "valeur alphabetique seulement ",
                                    },
                                    validate: {
                                        pasSeulementEspace: (value) => {
                                            value.trim() !== "" ||
                                                "Valeur requise.";
                                        },
                                    },
                                }}
                            />
                        </div>
                        <div className="mt-2">
                            <Input
                                name="email"
                                label="Email"
                                type="email"
                                placeholder="entrez votre mail"
                                validation={{
                                    required: "Valeur requise.",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "format du mail invalide",
                                    },
                                }}
                            />
                        </div>

                        <div className="mt-2 flex flex-row justify-between">
                            <div>
                                <Select
                                    label={"Type de Compte"}
                                    name={"role"}
                                    className="border-gray-300 border-[2px] rounded-[6px] p-2 w-[11vw] focus:bg-gray-100"
                                    options={[
                                        { value: "", label: "Type de compte" },
                                        {
                                            value: "isChefService",
                                            label: "Chef de Service",
                                        },
                                        {
                                            value: "isChefUnit",
                                            label: "Chef d'Unité (division/Bureau)",
                                        },
                                        {
                                            value: "isPersCellule",
                                            label: "Personnel du Cellule",
                                        },
                                        {
                                            value: "isPersSecretariat",
                                            label: "Personnel du secretariat",
                                        },
                                    ]}
                                />
                            </div>
                            <div className="ml-3">
                                <Select
                                    label={"Unité de travail"}
                                    name={"unit_id"}
                                    className="border-gray-300 border-[2px] rounded-[6px] p-2 w-[11vw] focus:bg-gray-100"
                                    options={unitOptions}
                                />
                            </div>
                        </div>
                        <div className="mt-2">
                            <Input
                                name="pass_word"
                                label="Mot de passe"
                                type="password"
                                placeholder="entrez votre mot de passse"
                                validation={{
                                    required: "Valeur requise.",
                                }}
                            />
                        </div>
                        <div className="mt-2">
                            <Input
                                name="confirmation"
                                label="confirmation"
                                type="password"
                                placeholder="confirmer votre mot de passe"
                                validation={{
                                    required: "Valeur requise.",
                                }}
                            />
                        </div>
                        <div className="mt-6 flex justify-end ">
                            <div className="flex flex-row items-center justify-between">
                                <div className="mr-4 underline text-gray-500"><NavLink to="/login" > S'authentifier ? </NavLink></div>
                                <button type="submit" className="bg-gray-700 text-white py-1 px-4 rounded-[8px] hover:bg-gray-600">S'inscrire</button>
                            </div>
                            
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default Register;
