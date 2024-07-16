/**
 * Convert a date string to a Spot date string
 * @param {string} dateString - The date string to convert
 * @returns {string} - The Spot date string
 * @throws {Error} - If the date string is invalid
 * @note - Spot date strings are in the format "2024-07-14T16:00:00+0000" i.e. No trailing Z, No milliseconds, Always use +0000 for the timezone
 */
export function toSpotDate(dateString) {
  let str = new Date(dateString).toISOString().split(".")[0] + "+0000";

  // Spot API requires + to be encoded
  return str.replace("+", "%2b");
}

/**
 * Fetched Messages from the Spot API
 *
 * https://www.findmespot.com/en-us/support/spot-gen4/get-help/general/public-api-and-xml-feed
 *
 * @param {string} feedId - The feed id of the messages
 * @param {string} startDate - The start date of the messages
 * @param {string} endDate - The end date of the messages
 * @returns {Promise} - The fetched messages
 * @throws {Error} - If the fetch fails
 *
 */
export async function fetchSpotMessages(feedId, startDate, endDate) {
  let url = `https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/${feedId}/message.json`;

  const params = [];

  if (startDate) {
    params.push(`startDate=${toSpotDate(startDate)}`);
  }

  if (endDate) {
    params.push(`endDate=${toSpotDate(endDate)}`);
  }

  if (params.length > 0) url += `?${params.join("&")}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error fetching messages: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.response.errors) {
    throw new Error(
      `Error fetching messages: ${data.response.errors.error.text}`,
    );
  }

  return data.response.feedMessageResponse.messages.message || [];
}
