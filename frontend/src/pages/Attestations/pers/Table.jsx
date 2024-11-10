import {
    CheckCheck,
    CopyPlus,
    File,
    FileText,
    Mail,
    Printer,
    SquarePen,
    SquareX,
    Trash2,
    UserCheck,
    UserPen,
    UserX,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { isArrayNotNull } from "../../../functions/Functions";

function Table({ data, onRow, onInform, onAttestation, onCollected }) {
    const tableContainerRef = useRef(null);
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        if (tableContainerRef.current) {
            tableContainerRef.current.scrollTop =
                tableContainerRef.current.scrollHeight;
        }
    }, [data]);

    console.log(data);

    return (
        <>
            <div className="px-3 mt-4 pb-2 relative text-[16px]  ">
                <div className="p-2 rounded-[12px] border shadow-md ">
                    <div
                        ref={tableContainerRef}
                        className="table_main h-[78vh] overflow-auto"
                    >
                        <table className="table table-fixed text-left  w-full  p-[1rem] border-collapse">
                            <thead className="rounded-[20px] s">
                                <tr className="sticky text-gray-700 bg-gray-200 z-12 top-0 left-0">
                                    <th className="rounded-tl-[12px] rounded-bl-[12px]">
                                        Numero
                                    </th>
                                    <th> Stagiaire </th>
                                    <th> Division d'acceuil</th>
                                    <th> Attestation </th>
                                    <th className="rounded-tr-[12px] rounded-br-[12px]"></th>
                                </tr>
                            </thead>

                            <tbody>
                                {isArrayNotNull(data) &&
                                    data.map((item) => {
                                        const stagiaire = item.stagiaire;
                                        const division = item.unite;
                                        const attestation = item.attestation;
                                        const isSelect = selected
                                            ? selected.id == item.id
                                            : false;
                                        const disabledAttestation =
                                            !item.observaion == "Achevé";
                                        const disabledMail =
                                            !attestation.status ||
                                            attestation.isCollected;
                                        // const status = attestation.status
                                        const isDisabledFournie =
                                            !attestation.isInforme ||
                                            !attestation.status ||
                                            attestation.isCollected;
                                        return (
                                            <tr
                                                key={item.id}
                                                className={`h-1 cursor-pointer ${
                                                    isSelect &&
                                                    "bg-gray-100 border-r-[4px] border-blue-400"
                                                }`}
                                                onClick={() => {
                                                    setSelected(item);
                                                    onRow(item);
                                                }}
                                            >
                                                <td className="rounded-l-[12px]">
                                                    {!attestation.isCollected
                                                        ? attestation.numero
                                                        : "- - - "}
                                                </td>
                                                <td>
                                                    {stagiaire.nom}{" "}
                                                    {stagiaire.prenom}
                                                </td>
                                                <td> {division.nom} </td>
                                                <td>
                                                    <div className="flex flex-row text-white">
                                                        {attestation ? (
                                                            attestation.isCollected ? (
                                                                <p className="bg-gray-600 px-3 rounded-xl">
                                                                    livré
                                                                </p>
                                                            ) : attestation.status ? (
                                                                <p className="bg-blue-500 px-3 rounded-xl">
                                                                    Pret
                                                                </p>
                                                            ) : (
                                                                <p className="bg-gray-600 px-3 rounded-xl">
                                                                    En attente
                                                                </p>
                                                            )
                                                        ) : (
                                                            <p>---</p>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="rounded-r-[12px]">
                                                    <div className="flex flex-row items-center justify-start text-white">
                                                        <button
                                                            className="text-gray-500 mr-2 px-3 py-1 hover:text-gray-700"
                                                            disabled={
                                                                disabledAttestation
                                                            }
                                                            onClick={() => {
                                                                onAttestation(
                                                                    item
                                                                );
                                                            }}
                                                        >
                                                            <Printer
                                                                size={22}
                                                            />
                                                        </button>
                                                        <button
                                                            className={`
                                                                ${
                                                                    !disabledMail &&
                                                                    "text-blue-500 mr-2 px-3 py-1 hover:text-blue-700"
                                                                }
                                                                ${
                                                                    disabledMail &&
                                                                    "text-blue-500 mr-2 px-3 py-1 opacity-40"
                                                                }     
                                                            `}
                                                            onClick={() => {
                                                                onInform(item);
                                                            }}
                                                            disabled={
                                                                disabledMail
                                                            }
                                                        >
                                                            <Mail size={22} />
                                                        </button>
                                                        <button
                                                            className={`
                                                                ${
                                                                    !isDisabledFournie &&
                                                                    "text-blue-500 mr-6 px-3 py-1 hover:text-blue-700"
                                                                }
                                                                ${
                                                                    isDisabledFournie &&
                                                                    "text-blue-500 mr-6 px-3 py-1 opacity-40"
                                                                }     
                                                            `}
                                                            onClick={() => {
                                                                onCollected(
                                                                    item
                                                                );
                                                            }}
                                                            disabled={
                                                                isDisabledFournie
                                                            }
                                                        >
                                                            <CheckCheck
                                                                size={22}
                                                            />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                <tr>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Table;
