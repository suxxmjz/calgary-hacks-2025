import axios from 'axios';
import { useState, useEffect } from "react";
export const useGetFetch = <T, > (url: string) =>{
    const [data, setData] = useState<T| null>() ;
    const [error, setError] = useState<string | null>() ;

    useEffect(() => {
        axios.get<T>(url)
           .then(response => setData(response.data))
           .catch(error => setError(error.message));
    }, [url]);

    return { data, error };
}