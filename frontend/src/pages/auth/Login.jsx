import React from "react";
import Form from "../../components/forms/Form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../features/currentUser";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import illustration from "../../assets/images/Office work-rafiki.png";
import InputAuth from "../../components/forms/InputAuth";

function Login() {
    const dispatch = useDispatch();
    const url = useSelector((state) => state.backendUrl.value);
    const toastConfig = useSelector((state) => state.toastConfig.value);

    const login = async (data) => {
        try {
            const logged_in = await axios.post(`${url}/login`, data, {
                withCredentials: true,
            });
            const message = logged_in.data.message;
            const current_user = logged_in.data.data;
            dispatch(setCurrentUser(current_user));
            toast.success(message, { toastConfig });
        } catch (error) {
            const message = error.response.data.message;
            toast.error(message, toastConfig);
        }
    };

    const onSubmit = (data) => {
        login(data);
    };

    return (
        <>
            <div className="h-full w-full bg-gray-100 flex flex-col justify-center items-center relative">
                <div className="flex flex-row justify-start items-center w-full h-full">
                    <div className="flex-1 flex flex-row justify-start items-center w-full px-24">
                        <img src={illustration} className="w-[85vh] h-[80vh]" />
                    </div>
                    <div className="bg-[#2f2e2e] h-full w-full flex-1 flex flex-col justify-center items-cente relative">
                        <div className="text-center absolute text-white text-2xl top-[10vh] w-full">
                            <p className="">Authentification</p>
                        </div>
                        <div className="flex flex-col justify-center items-center text-lg ">
                            <Form onSubmit={onSubmit}>
                                <div className="mt-6 w-[25vw]">
                                    <InputAuth
                                        label={"Matricule"}
                                        name={"matricule"}
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
                                                    "valeur inappropriée (seulement valeur numerique) ",
                                            },
                                        }}
                                    />
                                </div>
                                <div className="mt-8">
                                    <InputAuth
                                        name="password"
                                        label="Mot de passe"
                                        type="password"
                                        placeholder="entrez votre mot de passse"
                                        validation={{
                                            required: "Valeur requise.",
                                        }}
                                        autoComplete="off"
                                    />
                                </div>

                                <div className="mt-6 flex justify-end items-center text-white">
                                    <div className="flex flex-row justify-between items-center ">
                                        <div className="underline mr-3">
                                            <NavLink to="/guest/register">
                                                S'inscrire
                                            </NavLink>
                                        </div>
                                        <button
                                            className="bg-white text-gray-700 px-4 py-1 rounded-[8px] hover:bg-gray-200"
                                            type="submit"
                                        >
                                            S'authentifier
                                        </button>
                                    </div>
                                </div>
                            </Form>
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

export default Login;
