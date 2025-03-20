
export const isServerContext = typeof window === 'undefined';
export const isClientContext = !isServerContext;