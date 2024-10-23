import { CopyPlus, SquarePen, SquareX, Trash2, UserCheck, UserPen, UserX } from 'lucide-react'
import React from 'react'

function Table({data ,popup, addPopUp}) {
  return (
            <>
            <div className="px-2 pb-2 relative">
                <div className="table_main h-[75vh] border rounded-[12px] shadow-sm overflow-auto ">
                    <table className="table table-fixed bg-gray-50 text-left  w-full h-full p-[1rem] border-collapse">
                        <thead>
                            <tr className="sticky text-gray-700 bg-gray-200 z-12 top-0 left-0">
                                <th>Nom</th>
                                <th> Type</th>
                                <th> Sur-Division </th>
                                <th> </th>
                            </tr>
                        </thead>

                        <tbody>
                            {data &&
                                data.map((item) => (
                                    <tr key={item.id} className="">
                                        <td>
                                            {item.nom}
                                        </td>
                                        <td>
                                            {/* {item.isDivision ? "div" : "bur"} */}
                                            {item.Bureau ? "Bureau" :( item.isDivision ? "Division" : "Bureau")}
                                        </td>
                                        <td>
                                            {item.sur_division ? item.sur_division.nom : "-  -  -"}
                                        </td>
                                        <td>
                                            <div className="flex flex-row items-center justify-center text-white">
                                                <button className="text-blue-500 mr-2 px-3 py-1">
                                                    <SquarePen size={22} />
                                                </button>
                                                <button className="text-gray-500 mr-2 px-3 py-1">
                                                    <Trash2 size={22} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            <tr></tr>
                        </tbody>
                    </table>
                </div>
                <div className="btn_place absolute bottom-0 right-0 pb-2 pr-[8px]">
                    <button
                        className="btn_style flex flex-row items-center justify-center bg-blue-500 px-4 py-1 w-full rounded-tl-[7px] rounded-br-[7px] text-gray-100 hover:bg-blue-600 "
                        onClick={()=>{addPopUp(!popup)}}
                    >
                        <CopyPlus size={17} />
                        <p className="ml-1">Add</p>
                    </button>
                </div>
            </div>
        </>
  )
}

export default Table