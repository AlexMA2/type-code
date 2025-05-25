import { useEffect, useState } from "react";
import { LanguageCode } from "./Code.model";
import { HttpResponse } from "@/utils/http/models/HttpResponse.model";

export function useGetCode(language: LanguageCode): HttpResponse<any[]> {
    const [data, setData] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const url = `/data/${language}.json`;
    useEffect(() => {
        fetch(url)
            .then((res) => {
                if (!res.ok)
                    throw new Error(
                        "Fech Error: It was not possible to fetch the data for this language: " +
                            language
                    );
                return res.json();
            })
            .then((json) => setData(json))
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    return { data, loading, error };
}
