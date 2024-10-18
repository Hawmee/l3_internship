import React from "react";
import { NavLink } from "react-router-dom";
import FormWrapper from "../../components/forms/FormWrapper";
import Inputs from "../../components/forms/Inputs";
import * as yup from "yup";

function Register() {
    const initialValue = {
        nom: "",
        prenom: "",
        email: "",
        status: false,
        matricule: "",
        pass_word: "",
        isChefService: false,
        isChefUnit: false,
        isPersCellule: false,
        isPersSecretariat: false,
        unite_id: null,
    };

    const validationSchema = yup.object({
        nom: yup
            .string()
            .matches(/^[a-zA-Z]+$/, "Caracteres speciaux non autorisé !")
            .required("Ce champ est requis")
            .max(25, "25 Caracteres au maximum"),
        prenom: yup
            .string()
            .matches(/^[a-zA-Z]*$/, "Caracteres speciaux non autorisé !")
            .test(
                "Pas-espace-sulement",
                "Espace non acceptée comme valeure",
                (value) => value && value.trim().length > 0
            )
            .required("Ce champ est requis"),
        email: yup.string().email("Format non accepté"),
        status: yup.boolean(),
        matricule: yup
            .string()
            .matches(/^[0-9]{8}$/, "Ce champ ne doit contenir que de chiffres")
            .required("Ce champ est requis"),
        pass_word: yup
            .string()
            .matches(
                /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
                "Doit contenir au moins une majuscule et un caractère spécial"
            )
            .min(8, "Doit contenir au moins 8 caractères")
            .required("Ce champ est requis"),
        isChefService: yup.boolean().required("Ce champ est requis"),
        isChefUnit: yup.boolean().required("Ce champ est requis"),
        isPersCellule: yup.boolean().required("Ce champ est requis"),
        isPersSecretariat: yup.boolean().required("Ce champ est requis"),
        unite_id: yup
            .number()
            .nullable()
    });

    const onSubmit = (values) => {
        console.log("form data : ", values);
        console.log(1);
        
    };

    return (
        <>
            <div className="h-full w-full bg-gray-200 flex flex-col justify-center items-center">
                <div className="bg-white rounded p-4">
                    {/* <form>
                        <div>
                            <h1> Register </h1>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="matricule">Matricule</label>
                            <input
                                type="text"
                                className="border border-gray-500"
                            />
                        </div>
                        <div className="flex flex-col mt-2">
                            <label htmlFor="Name">Name</label>
                            <input
                                type="text"
                                className="border border-gray-500"
                            />
                        </div>
                        <div className="flex flex-col mt-2">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                className="border border-gray-500"
                            />
                        </div>
                        <div className="flex flex-col mt-2">
                            <label htmlFor="mail">mail</label>
                            <input
                                type="mail"
                                className="border border-gray-500"
                            />
                        </div>
                        <div className="mt-2 flex flex-row justify-between">
                            <div className="flex flex-col px-4">
                                <label htmlFor="user">UserType</label>
                                <select
                                    name="user"
                                    className="border border-gray-700"
                                >
                                    <option value="isChefService">
                                        Chef de Service
                                    </option>
                                    <option value="isChefUnits">
                                        Chef Units
                                    </option>
                                    <option value="isPersCellule">
                                        Cellule Personal
                                    </option>
                                    <option value="isPersSec">
                                        Secretariat{" "}
                                    </option>
                                </select>
                            </div>
                            <div className="flex flex-col px-4">
                                <label htmlFor="user">UserType</label>
                                <select
                                    name="user"
                                    className="border border-gray-700"
                                >
                                    <option value="isChefService">
                                        Chef de Service
                                    </option>
                                    <option value="isChefUnits">
                                        Chef Units
                                    </option>
                                    <option value="isPersCellule">
                                        Cellule Personal
                                    </option>
                                    <option value="isPersSec">
                                        Secretariat{" "}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col mt-2">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="border border-gray-500"
                            />
                        </div>
                        <div className="flex flex-col mt-2">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="border border-gray-500"
                            />
                        </div>
                        <div>
                            <p>
                                Already got an account ?{" "}
                                <NavLink
                                    to="/login"
                                    className="text-blue-400 hover:text-blue-500"
                                >
                                    Login
                                </NavLink>
                            </p>
                        </div>
                        <div>
                            <button
                                className="bg-blue-500 text-gray-50 px-2 rounded-[8px] hover:bg-blue-600"
                                type="button"
                            >
                                Log In
                            </button>
                        </div>
                    </form> */}
                    <FormWrapper
                        initialValues={initialValue}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Inputs label="Nom" name="nom" type="text" />

                        <div>
                            <button type="submit" className="bg-blue-400">Register</button>
                        </div>
                    </FormWrapper>
                </div>
            </div>
        </>
    );
}

export default Register;
