export const required     = value => (value || typeof value === 'number' ? undefined : 'This field is required.');
export const futureDate   = value => (value > new Date ? undefined : 'The date must be in the future.');
export const pastDate     = value => (value < new Date ? undefined : 'The date must be in the past.');
export const alwaysError  = value => ('there was an error because there always is with this one.');
