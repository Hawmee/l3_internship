import React from 'react';
import {Controller, useFormContext} from "react-hook-form";
import Select from "react-select";
// import Select from 'react-select';
// eslint-disable-next-line react/prop-types
function SelectSearch({label , name , option ,  validation , ...props }) {

    const { register , setValue , formState:{errors} } = useFormContext()
    const customStyles = {
        control: (base) => ({
            ...base,
            borderColor: 'gray',
            boxShadow: 'none',
            '&:hover': {
                borderColor: 'gray',
            },
            padding: '2px',
            borderRadius: '8px', // Tailwind rounded-md
            backgroundColor: 'white', // or use Tailwind's bg-white
        }),
        menu: (base) => ({
            ...base,
            borderRadius: '0.375rem', // Tailwind rounded-md
            marginTop: '0.25rem', // Tailwind mt-1
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Tailwind shadow-md
        }),
        option: (base, { isFocused }) => ({
            ...base,
            backgroundColor: isFocused ? '#e5e7eb' : 'white', // Tailwind bg-gray-200
            color: isFocused ? '#000' : '#374151', // Tailwind text-gray-700
            padding: '10px',
            cursor: 'pointer',
            '&:active': {
                backgroundColor: '#d1fae5', // Tailwind bg-green-100
            },
        }),
    };
    return (
        <>
            <div className="flex flex-col">
                <label>{label}</label>
                <Select
                    {...register(name,validation)}
                    options={option}
                    onChange={option => setValue(name, option.value)}
                    styles={customStyles}
                    isClearable
                    {...props}

                />
            </div>
        </>
    );
}

export default SelectSearch;