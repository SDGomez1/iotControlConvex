/**
 * Generates a universally unique identifier (UUID) according to the version 4 UUID specification.
 * This function uses a combination of the current timestamp and random numbers to ensure uniqueness
 * and randomness in the generated UUID. Each UUID consists of 32 hexadecimal characters split into
 * five groups (8-4-4-4-12) separated by dashes. A '4' in the third group indicates a version 4 UUID,
 * and certain bits in the fourth group provide variant information.
 *
 * @returns {string} A randomly generated version 4 UUID.
 *
 * @example
 * const uuid = generateUUID();
 * console.log(uuid);
 * // Output: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 */
export function generateUUID() {
  let dt = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    },
  );
  return uuid;
}
