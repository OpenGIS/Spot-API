async function o(s) {
  const t = `https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/${s}/message.json`;
  try {
    const e = await fetch(t);
    if (!e.ok)
      throw new Error("Failed to fetch messages");
    return (await e.json()).response.feedMessageResponse.messages.message;
  } catch (e) {
    throw new Error(e.message);
  }
}
export {
  o as fetchSpotMessages
};
