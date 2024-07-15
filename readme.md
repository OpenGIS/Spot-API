# Spot API

A JavaScript Library for interacting with the Find Me [Spot Messaging API](https://www.findmespot.com/en-us/support/spot-gen4/get-help/general/public-api-and-xml-feed).

![Spot API](./dev/data/screenshot.png)

# Usage

```javascript
import { fetchSpotMessages } from "@ogis/spot-api";

const feedId = "0onlLopfoM4bG5jXvWRE8H0Obd0oMxMBq";
const startDate = "2012-07-03T00:00:00-0000";
const endDate = "2012-08-02T00:00:00-0000";

fetchSpotMessages(feedId, startDate, endDate)
	.then((messages) => {
		// Do something with the messages
		console.log(messages);
	})
	.catch((error) => {
		console.error(error);
	});
```

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run the Development app
npm run dev
```

### Environment Variables

By creating a `.env` file in the root of the project, you can set the following defaults for the Development App:

```bash
VITE_SPOT_FEED_ID=[Your Feed ID]
VITE_SPOT_FEED_START=[The Start Date of the Feed: YYYY-MM-DDTHH:MM:SS-0000]
VITE_SPOT_FEED_END=[The End Date of the Feed: YYYY-MM-DDTHH:MM:SS-0000]
```

Example:

```bash
VITE_SPOT_FEED_ID=0onlLopfoM4bG5jXvWRE8H0Obd0oMxMBq
VITE_SPOT_FEED_START=2012-07-03T00:00:00-0000
VITE_SPOT_FEED_END=2012-08-02T00:00:00-0000
```
