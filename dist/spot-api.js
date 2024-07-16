function i(s) {
  return (new Date(s).toISOString().split(".")[0] + "+0000").replace("+", "%2b");
}
async function p(s, r, n) {
  let a = `https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/${s}/message.json`;
  const e = [];
  r && e.push(`startDate=${i(r)}`), n && e.push(`endDate=${i(n)}`), e.length > 0 && (a += `?${e.join("&")}`);
  const t = await fetch(a);
  if (!t.ok)
    throw new Error(`Error fetching messages: ${t.statusText}`);
  const o = await t.json();
  if (o.response.errors)
    throw new Error(
      `Error fetching messages: ${o.response.errors.error.text}`
    );
  return o.response.feedMessageResponse.messages.message || [];
}
export {
  p as fetchSpotMessages,
  i as toSpotDate
};
