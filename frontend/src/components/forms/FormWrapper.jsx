import { Form, Formik } from "formik";
import React from "react";

function FormWrapper({ initialValues, validationSchema, onSubmit, children }) {
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit} className="flex flex-col">
                        {children}
                        <button type="submit">haha</button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default FormWrapper;
