import { da } from "date-fns/locale";

export const isArrayNotNull = (data) => {
    return Array.isArray(data) && data.length > 0;
};

export const isArray = (data) => {
    return Array.isArray(data);
};

export const filterObjSame = (data, key, value) => {
    if (!value) {
        return data.filter((object) =>
            isArray(object[key]) ? object[key].length > 0 : object[key]
        );
    }
    return data.filter((object) => object[key] == value);
};

export const filterObjdiff = (data, key, value) => {
    if (!value) {
        return data.filter((object) => 
            isArray(object[key])? object[key].length <= 0 :!object[key]);
    }
    return data.filter((object) => object[key] !== value);
};

export const include = (data, value) => {
    return data.includes(value);
};
