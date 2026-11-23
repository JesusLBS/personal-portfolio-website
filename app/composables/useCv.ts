export function useCv() {
    const isPreviewOpen = useState('cv-preview-open', () => false);
    const previewTriggerId = useState<string | null>('cv-preview-trigger-id', () => null);

    return {
        cvUrl: '/files/cv_jesus_chicho_hernandez.pdf',
        downloadName: 'cv_jesus_chicho_hernandez.pdf',
        isPreviewOpen,
        previewTriggerId,
    };
}
