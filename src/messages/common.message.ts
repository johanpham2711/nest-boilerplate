export const COMMON_MESSAGES = {
  INTERNAL_SERVER_ERROR: 'Internal Server Error!',
  FIELD_REQUIRED: (field: string): string => `This ${field} field is required!`,
  MIN_LENGTH: (field: string, length: number): string =>
    `The ${field} field is from ${length} characters or more`,
  MAX_LENGTH: (field: string, length: number): string =>
    `The ${field} field is less than ${length} characters.`,
  LENGTH: (field: string, length: number): string =>
    `The ${field} field must be ${length} characters.`,
  INVALID_EMAIL: 'Invalid email address!',
  INVALID_PASSWORD:
    'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
  INVALID_CONFIRM_PASSWORD: 'Confirm password does not match!',
};
