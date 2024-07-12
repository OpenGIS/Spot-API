import { describe, it, expect, vi } from "vitest";
import { fetchSpotMessages } from "@/main.js";

global.fetch = vi.fn();

const mockResponse = {
	response: {
		feedMessageResponse: {
			messages: {
				message: [
					{
						"@clientUnixTime": "0",
						id: 1234567890,
						messengerId: "0-1234567",
						messengerName: "My Spot",
						unixTime: 1720808591,
						messageType: "UNLIMITED-TRACK",
						latitude: 49.123456,
						longitude: -124.123456,
						modelId: "SPOTG4",
						showCustomMsg: "Y",
						dateTime: "2024-07-12T18:23:11+0000",
						batteryState: "GOOD",
						hidden: 0,
						altitude: 20,
					},
					{
						"@clientUnixTime": "0",
						id: 1234567891,
						messengerId: "0-1234567",
						messengerName: "My Spot",
						unixTime: 1720808292,
						messageType: "UNLIMITED-TRACK",
						latitude: 49.123456,
						longitude: -124.123456,
						modelId: "SPOTG4",
						showCustomMsg: "Y",
						dateTime: "2024-07-12T18:18:12+0000",
						batteryState: "GOOD",
						hidden: 0,
						altitude: 8,
					},
					{
						"@clientUnixTime": "0",
						id: 1234567892,
						messengerId: "0-1234567",
						messengerName: "My Spot",
						unixTime: 1720807990,
						messageType: "UNLIMITED-TRACK",
						latitude: 49.123456,
						longitude: -124.123456,
						modelId: "SPOTG4",
						showCustomMsg: "Y",
						dateTime: "2024-07-12T18:13:10+0000",
						batteryState: "GOOD",
						hidden: 0,
						altitude: 26,
					},
					{
						"@clientUnixTime": "0",
						id: 1234567893,
						messengerId: "0-1234567",
						messengerName: "My Spot",
						unixTime: 1720807691,
						messageType: "UNLIMITED-TRACK",
						latitude: 49.6423,
						longitude: -124.93341,
						modelId: "SPOTG4",
						showCustomMsg: "Y",
						dateTime: "2024-07-12T18:08:11+0000",
						batteryState: "GOOD",
						hidden: 0,
						altitude: -103,
					},
				],
			},
		},
	},
};

describe("fetchSpotMessages", () => {
	it("fetches messages without dates", async () => {
		fetch.mockResolvedValue({
			ok: true,
			json: () => mockResponse,
		});

		const messages = await fetchSpotMessages("testFeedId");
		expect(messages).toHaveLength(4);
	});

	it("fetches messages with start and end dates", async () => {
		fetch.mockResolvedValue({
			ok: true,
			json: () => mockResponse,
		});

		const messages = await fetchSpotMessages(
			"testFeedId",
			"2024-07-12T18:00:00",
			"2024-07-12T18:30:00",
		);
		expect(messages).toHaveLength(4);
	});

	it("handles fetch errors", async () => {
		fetch.mockResolvedValue({
			ok: false,
			statusText: "Not Found",
		});

		await expect(fetchSpotMessages("testFeedId")).rejects.toThrow(
			"Error fetching messages: Not Found",
		);
	});

	it("handles Spot API errors", async () => {
		fetch.mockResolvedValue({
			ok: true,
			json: () => ({
				response: {
					errors: {
						error: {
							code: "E-0195",
							text: "No Messages to display",
							description:
								"No displayable messages found found for feed: 0WUgDxCCFJP51Jv4FVrOEqOcMVXASErYj",
						},
					},
				},
			}),
		});

		await expect(fetchSpotMessages("testFeedId")).rejects.toThrow(
			"Error fetching messages: No Messages to display",
		);
	});
});
