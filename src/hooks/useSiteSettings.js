import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../config/api";
import { DEFAULT_SITE_SETTINGS, normalizeSiteSettings } from "../content/defaultSiteSettings";

let siteSettingsCache = DEFAULT_SITE_SETTINGS;
let hasLoadedSiteSettings = false;
let inflightRequest = null;
const listeners = new Set();

async function fetchSiteSettings() {
    if (inflightRequest) {
        return inflightRequest;
    }

    inflightRequest = (async () => {
        try {
            const response = await fetch(API_ENDPOINTS.SITE_SETTINGS, {
                headers: { Accept: "application/json" },
            });
            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                siteSettingsCache = normalizeSiteSettings(data?.settings);
                hasLoadedSiteSettings = true;
                listeners.forEach((listener) => listener(siteSettingsCache));
            }
        } catch {
            // keep defaults
        } finally {
            inflightRequest = null;
        }
    })();

    return inflightRequest;
}

export function useSiteSettings() {
    const [settings, setSettings] = useState(siteSettingsCache);

    useEffect(() => {
        listeners.add(setSettings);

        if (!hasLoadedSiteSettings) {
            void fetchSiteSettings();
        } else {
            setSettings(siteSettingsCache);
        }

        return () => {
            listeners.delete(setSettings);
        };
    }, []);

    return settings;
}
