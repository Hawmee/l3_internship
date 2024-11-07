import { addHours, format, parseISO, startOfToday } from "date-fns";
import { fr } from "date-fns/locale";

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


export const formatDate = (date)=>{
    const dateString = parseISO(date)
    const timezone = -3;
    const localDate = addHours(dateString,timezone)
    return localDate
}

export const date_time = (date)=>{
    const formated_date = formatDate(date)
    const date_hour = format(formated_date , "dd/MM/yyyy , HH:mm")
    return date_hour
}


export const date_d_m_y = (date)=>{
    const formated_date = formatDate(date)
    const d_m_y = format(formated_date , "dd/MM/yyyy")
    return d_m_y
}


export const today_string = ()=>{
    const today = startOfToday()
    return format(today, "EEEE,dd MMMM yyyy", { locale: fr });
}


