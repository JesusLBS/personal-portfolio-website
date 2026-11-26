/** Accept public HTTPS Calendly links, never credentials or lookalike hosts. */
export function resolveCalendlyUrl(value: unknown): string {
    if (typeof value !== 'string' || !value.trim()) return '';
    try {
        const url = new URL(value.trim());
        if (url.protocol !== 'https:' || !['calendly.com', 'www.calendly.com'].includes(url.hostname)
            || url.username || url.password || url.port || url.pathname === '/') return '';
        return url.href;
    } catch {
        return '';
    }
}
