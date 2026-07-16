/**
 * Application Constants
 */
const APP = {
  NAME: 'Tellin API Testing Application',
  VERSION: '1.0.0',
  DESCRIPTION: 'Internal developer tool for testing Laravel APIs and SSO integration',
};

const REQUEST = {
  TIMEOUT: 15000,
};

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'tellin_access_token',
  REFRESH_TOKEN: 'tellin_refresh_token',
  USER: 'tellin_user',
};

const DEV_MODE = import.meta.env.DEV;

export { APP, REQUEST, STORAGE_KEYS, DEV_MODE };
