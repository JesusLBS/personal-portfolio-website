import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

export default defineNuxtPlugin(() => {
    Fancybox.bind('[data-fancybox]', {
        groupAll: false,
    });
});