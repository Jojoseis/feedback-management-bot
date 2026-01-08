import { Events, GatewayIntentBits } from "discord.js";
import UserException from "../utils/errorhandling/exceptions/UserException";
import BaseClient from "../utils/interface/BaseClient";
import Message from "../utils/interface/reply/Message";
import Logger from "../utils/logging/Logger";
import Commands from "./Commands";

export default class CommandReceiver extends BaseClient {
	public constructor() {
		super({ intents: [GatewayIntentBits.Guilds] });

		this.on(Events.InteractionCreate, async (interaction) => {
			if (!interaction.isChatInputCommand()) {
				return;
			}

			const command = Commands.find((command) => command.name === interaction.commandName);

			if (!command) {
				console.error(`No command handler found for command: ${interaction.commandName}`);
				return;
			}

			try {
				await command.handle(interaction);
			} catch (error) {
				if (error instanceof UserException) {
					Logger.warn(error);
					await interaction.followUp(Message.ephemeral(error.message));
				} else {
					Logger.error("Unexpected error during command handling.");
					Logger.error(error);
					await interaction.followUp(Message.ephemeral("An unexpected error occurred. Please contact an administrator."));
				}
			}
		});
	}
}
