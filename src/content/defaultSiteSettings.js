export const DEFAULT_SITE_SETTINGS = {
    support_email: "Supportsolarionisenergy@gmail.com",
    support_phone: "",
    support_address: "123 Fifth Avenue, New York, NY 10160, United States",
    working_hours_weekdays: "Mon - Fri: 9AM - 6PM",
    working_hours_weekends: "Sat - Sun: 10AM - 4PM",
};

export function normalizeSiteSettings(payload) {
    if (!payload || typeof payload !== "object") {
        return DEFAULT_SITE_SETTINGS;
    }

    return {
        support_email: String(payload.support_email || DEFAULT_SITE_SETTINGS.support_email),
        support_phone: String(payload.support_phone || ""),
        support_address: String(payload.support_address || DEFAULT_SITE_SETTINGS.support_address),
        working_hours_weekdays: String(payload.working_hours_weekdays || DEFAULT_SITE_SETTINGS.working_hours_weekdays),
        working_hours_weekends: String(payload.working_hours_weekends || DEFAULT_SITE_SETTINGS.working_hours_weekends),
    };
}
