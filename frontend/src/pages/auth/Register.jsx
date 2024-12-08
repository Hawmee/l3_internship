import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../features/currentUser";
import { toast } from "react-toastify";
import { FormProvider, useForm } from "react-hook-form";
import { isArrayNotNull } from "../../functions/Functions";
import illustration from "../../assets/images/Office work-rafiki.png";
import InputAuth from "../../components/forms/InputAuth";
import SelectAuth from "../../components/forms/SelectAuth";

function Register() {
    const url = useSelector((state) => state.backendUrl.value);
    const toastConfig = useSelector((state) => state.toastConfig.value);
    const units = useSelector((state) => state.unit.value);
    const dispatch = useDispatch();
    const methods = useForm();
    const { watch, setValue, reset } = methods;

    const role = watch("role");

    const register = async (data) => {
        try {
            const currentUser = await axios.post(`${url}/register`, data);
            dispatch(setCurrentUser(currentUser.data));
        } catch (error) {
            const message = error.response.data.message;
            toast.error(message, toastConfig);
        }
    };

    const onSubmit = (data) => {
        const register_data = {
            ...data,
            unit_id: data.unit_id ? Number(data.unit_id) : null,
            status: data.role === "isChefService" ? true : false,
            isChefService: data.role === "isChefService",
            isChefUnit: data.role === "isChefUnit",
            isPersCellule: data.role === "isPersCellule",
            isPersSecretariat: data.role === "isPersSecretariat",
        };

        delete register_data.role;

        register(register_data);
        // console.log(register_data);
    };

    const units_options = isArrayNotNull(units)
        ? [
              { value: "", label: "Unité de travail" },
              ...units.map((unit) => ({
                  value: Number(unit.id),
                  label: unit.nom,
                  name,
              })),
          ]
        : [{ value: "", label: "Sur-Unité" }];

    useEffect(() => {
        console.log(role);

        if (role == "isPersCellule") {
            const unit_id =
                units_options.find((unit) => unit.label == "Cellule d'Appui")
                    ?.value || "";
            setValue("unit_id", unit_id);
        }

        if (role == "isPersSecretariat") {
            const unit_id =
                units_options.find((unit) => unit.label == "Secretariat")
                    ?.value || "";
            setValue("unit_id", unit_id);
        }
    }, [role]);

    return (
        <>
            <div className="h-full w-full bg-gray-100 flex flex-col justify-center items-center relative">
                <div className="flex flex-row justify-start items-center w-full h-full">
                    <div className="flex-1 flex flex-row justify-start items-center w-full px-24">
                        <img src={illustration} className="w-[85vh] h-[80vh]" />
                    </div>
                    <div className="bg-[#2f2e2e] h-full w-full flex-1 flex flex-col justify-center items-cente relative">
                        <div className="text-center absolute text-white text-2xl top-[10vh] w-full">
                            <p className="">S'enregistrer</p>
                        </div>
                        <div className="flex flex-col justify-center items-center text-lg ">
                            <FormProvider {...methods}>
                                <form
                                    className="min-w-32"
                                    onSubmit={methods.handleSubmit(onSubmit)}
                                >
                                    <div className="mt-6 w-[25vw]">
                                        <InputAuth
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
                                                    message:
                                                        "valeur inappropriée ",
                                                },
                                                validate: {
                                                    pasSeulementEspace: (
                                                        value
                                                    ) => {
                                                        value.trim() !== "" ||
                                                            "Valeur requise.";
                                                    },
                                                },
                                            }}
                                        />
                                    </div>

                                    <div className="mt-3 flex flex-row">
                                        <div className="mr-2">
                                            <InputAuth
                                                label={"Nom"}
                                                name={"nom"}
                                                type="text"
                                                validation={{
                                                    required:
                                                        "Valeur requise .",
                                                    maxLength: {
                                                        value: 50,
                                                        message:
                                                            "Trop long , veuillez redefinir",
                                                    },
                                                    pattern: {
                                                        value: /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/,
                                                        message:
                                                            "valeur innappropriée ",
                                                    },
                                                    validate: {
                                                        pasSeulementEspace: (
                                                            value
                                                        ) => {
                                                            value.trim() !==
                                                                "" ||
                                                                "Valeur requise.";
                                                        },
                                                    },
                                                }}
                                            />
                                        </div>

                                        <div className="">
                                            <InputAuth
                                                label={"Prenom"}
                                                name={"prenom"}
                                                type="text"
                                                validation={{
                                                    required:
                                                        "Valeur requise .",
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
                                                        pasSeulementEspace: (
                                                            value
                                                        ) => {
                                                            value.trim() !==
                                                                "" ||
                                                                "Valeur requise.";
                                                        },
                                                    },
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <InputAuth
                                            name="email"
                                            label="Email"
                                            type="email"
                                            placeholder="entrez votre mail"
                                            validation={{
                                                required: "Valeur requise.",
                                                pattern: {
                                                    value: /^\S+@\S+$/i,
                                                    message:
                                                        "format du mail invalide",
                                                },
                                            }}
                                            autoComplete="new-mail"
                                        />
                                    </div>

                                    <div className="mt-2 flex flex-row justify-between">
                                        <div>
                                            <SelectAuth
                                                label={"Type de Compte"}
                                                name={"role"}
                                                className="border-gray-300 border-[2px] rounded-[6px] p-2 w-[11vw] focus:bg-gray-100"
                                                options={[
                                                    {
                                                        value: "",
                                                        label: "Type de compte",
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
                                                validation={{
                                                    required:
                                                        "valeur requise !",
                                                }}
                                            />
                                        </div>
                                        {role == "isChefUnit" && (
                                            <div className="ml-3">
                                                <SelectAuth
                                                    label={"Unité de travail"}
                                                    name={"unit_id"}
                                                    className="border-gray-300 border-[2px] rounded-[6px] p-2 w-[11vw] focus:bg-gray-100"
                                                    options={units_options}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-2">
                                        <InputAuth
                                            name="pass_word"
                                            label="Mot de passe"
                                            type="password"
                                            placeholder="entrez votre mot de passse"
                                            validation={{
                                                required: "Valeur requise.",
                                            }}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <InputAuth
                                            name="confirmation"
                                            label="confirmation"
                                            type="password"
                                            placeholder="confirmer votre mot de passe"
                                            validation={{
                                                required: "Valeur requise.",
                                            }}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="mt-6 flex justify-end ">
                                        <div className="flex flex-row items-center justify-between">
                                            <div className="mr-4 underline text-white ">
                                                <NavLink to="/guest/login">
                                                    {" "}
                                                    S'authentifier ?{" "}
                                                </NavLink>
                                            </div>
                                            <button
                                                type="submit"
                                                className="bg-white text-gray-700 px-4 py-1 rounded-[8px] hover:bg-gray-200"
                                            >
                                                S'inscrire
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </FormProvider>
                            {/* <Form onSubmit=></Form> */}
                        </div>
                    </div>
                </div>

                <div className="text-[25px] absolute font-extrabold text-gray-500 top-[10vh] left-[15vw]">
                    SRB INTERN MANAGEMENT
                </div>
            </div>
        </>
    );
}

export default Register;
