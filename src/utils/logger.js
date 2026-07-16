import { DEV_MODE } from '../config/constants';

const PREFIX = '[Tellin]';

/**
 * Developer logging utilities.
 * Automatically disabled in production builds.
 */

export function logInfo(message, ...args) {
  if (!DEV_MODE) return;
  console.log(`${PREFIX} ℹ️ ${message}`, ...args);
}

export function logWarning(message, ...args) {
  if (!DEV_MODE) return;
  console.warn(`${PREFIX} ⚠️ ${message}`, ...args);
}

export function logError(message, ...args) {
  if (!DEV_MODE) return;
  console.error(`${PREFIX} ❌ ${message}`, ...args);
}
