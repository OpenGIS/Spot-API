/**
 * ==============================
 * ========= Components =========
 * ==============================
 */

/**
 * ==============================
 * ========= Composables ========
 * ==============================
 */

/**
 * ==============================
 * ========= Exports ============
 * ==============================
 */

export async function fetchSpotMessages(feedId) {
  const url = `https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/${feedId}/message.json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }

    const data = await response.json();

    return data.response.feedMessageResponse.messages.message;
  } catch (err) {
    throw new Error(err.message);
  }
}
