/* error codes have to be unique in order to find the problem in a fast way with the debugger */
export const appErrorCodes = {
  REQUEST_VALIDATION_ERROR: 'REQUEST_VALIDATION_ERROR',
  CONFIG_VALIDATION_ERROR: 'CONFIG_VALIDATION_ERROR',
} as const;

export type AppErrorCode = (typeof appErrorCodes)[keyof typeof appErrorCodes];
