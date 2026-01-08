import { Routes, type SlashCommandBuilder } from "discord.js";
import Environment from "../Environment.js";
import RestEndpoint from "./RestEndpoint.js";

export default class CommandEndpoint {
	private endpoint = new RestEndpoint();

	public async bulkOverwrite(commands: Array<SlashCommandBuilder>) {
		console.log(await this.endpoint.put(Routes.applicationCommands(Environment.getAppId()), { body: commands }));
	}
}
