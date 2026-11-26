export default defineEventHandler((event) => {
    setResponseHeader(event, 'Cache-Control', 'private, no-store');
    setResponseHeader(event, 'Netlify-CDN-Cache-Control', 'no-store');

    // Netlify handles this path at the edge. All other production hosts deny by default.
    const config = useRuntimeConfig(event);
    return { allowed: import.meta.dev && config.schedulingTestCountry === 'MX' };
});
