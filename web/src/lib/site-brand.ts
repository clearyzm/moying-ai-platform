export const DEFAULT_SITE_TITLE = "墨影AI漫剧创作平台";

export function resolveSiteTitle(value: unknown) {
    return typeof value === "string" && value.trim() ? value.trim() : DEFAULT_SITE_TITLE;
}
