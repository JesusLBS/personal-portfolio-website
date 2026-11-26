/** Use only Netlify's country signal; do not read IPs, cookies or caller-supplied headers. */
export default function schedulingCountry(_request, context) {
    return Response.json({ allowed: context?.geo?.country?.code === 'MX' }, {
        headers: {
            'Cache-Control': 'private, no-store',
            'Netlify-CDN-Cache-Control': 'no-store',
        },
    });
}

export const config = { path: '/api/scheduling-country', method: 'GET' };
