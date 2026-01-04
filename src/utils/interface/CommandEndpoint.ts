import { Routes, type SlashCommandBuilder } from "discord.js";
import Environment from "../Environment.ts";
import RestEndpoint from "./RestEndpoint.ts";

export default class CommandEndpoint {
	private endpoint = new RestEndpoint();

	public async bulkOverwrite(commands: Array<SlashCommandBuilder>) {
		console.log(await this.endpoint.put(Routes.applicationCommands(Environment.getAppId()), { body: commands }));
	}
}
