export function getGlobalThis() {
    return typeof window != 'undefined' ? window : global
}