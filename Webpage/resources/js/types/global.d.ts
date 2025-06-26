import type { route as routeFn } from 'ziggy-js';
import type Echo from 'laravel-echo';

declare global {
    const route: typeof routeFn;
    interface Window {
        Echo: Echo;
    }
}
