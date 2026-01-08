import { REST } from "discord.js";
import Environment from "../Environment.js";

export default class RestEndpoint extends REST {
	public constructor() {
		super();
		this.setToken(Environment.getDiscordToken());
	}
}
