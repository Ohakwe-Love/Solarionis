import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../config/api";
import { DEFAULT_FAQS, normalizeFaqs } from "../content/defaultFaqs";

export function usePublicFaqs() {
    const [faqs, setFaqs] = useState(DEFAULT_FAQS);

    useEffect(() => {
        const run = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.FAQS, {
                    headers: { Accept: "application/json" },
                });
                const data = await response.json().catch(() => ({}));

                if (response.ok) {
                    setFaqs(normalizeFaqs(data?.data));
                }
            } catch {
                // keep defaults
            }
        };

        run();
    }, []);

    return faqs;
}
