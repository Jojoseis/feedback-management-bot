import "dotenv/config";
import CommandReceiver from "./src/commands/CommandReceiver.ts";

new CommandReceiver().start();

/*
const app = express();

app.post("/test", verifyKeyMiddleware(Environment.getPublicKey()), handleTestRequest);


async function handleTestRequest(request, response) {
	console.log("Request body", JSON.stringify(request.body, null, 2));
	// Interaction id, type and data
	const { id, type, data } = request.body;

	if (type === InteractionType.PING) {
		return response.send({ type: InteractionResponseType.PONG });
	}

	if (type === InteractionType.APPLICATION_COMMAND) {
		const { name } = data;

		// "test" command
		if (name === "test") {
			// Send a message into the channel where command was triggered from
			return response.send({
				type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
				data: {
					flags: InteractionResponseFlags.IS_COMPONENTS_V2,
					components: [
						{
							type: MessageComponentTypes.TEXT_DISPLAY,
							// Fetches a random emoji to send from a helper function
							content: "hello world",
						},
					],
				},
			});
		}

		console.error(`unknown command: ${name}`);
		return response.status(400).json({ error: "unknown command" });
	}

	console.error("unknown interaction type", type);
	return response.status(400).json({ error: "unknown interaction type" });
}

app.listen(Environment.getPort(), () => {
	console.log("Listening on port", Environment.getPort());
});

*/
