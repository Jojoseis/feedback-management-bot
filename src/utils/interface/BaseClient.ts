import { Client, type ClientOptions, Events } from "discord.js";
import Environment from "../Environment.ts";

export default class BaseClient extends Client {
	public constructor(options: ClientOptions) {
		super(options);

		this.once(Events.ClientReady, (readyClient) => {
			console.log(`Logged in as ${readyClient.user.tag}!`);
		});
	}

	public async start() {
		await this.login(Environment.getDiscordToken());
	}
}
