import { useField } from "formik";
import React from "react";

function Inputs({ label, ...props }) {
    const [field, meta] = useField(props);

    return (
        <>
            <div className="flex flex-col my-2">
                <label>{label}</label>
                <input {...field} {...props} className="border border-gray-600" />
                {meta.touched && meta.error ? <div className="text-red-400">{meta.error}</div> : null}
            </div>
        </>
    );
}

export default Inputs;
