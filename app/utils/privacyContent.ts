export const privacyContact = {
    name: 'Jesus Chicho Hernández',
    email: 'chichohdzjesus@gmail.com',
    updatedAt: '24 de noviembre de 2026',
};

export const PRIVACY_LOCATION = 'Huixquilucan, Estado de México, México';

/** Only an explicit boolean true or the exact string "true" enables analytics. */
export function isAnalyticsEnabled(value: unknown): boolean {
    return value === true || value === 'true';
}

/** Resolve public contact data without treating a general location as a legal address. */
export function resolvePrivacyContact(value: unknown) {
    const configuredAddress = typeof value === 'string' ? value.trim() : '';
    return {
        ...privacyContact,
        address: configuredAddress || PRIVACY_LOCATION,
        addressLabel: configuredAddress ? 'Domicilio para oír y recibir notificaciones' : 'Ubicación',
        hasConfiguredAddress: configuredAddress.length > 0,
    };
}
