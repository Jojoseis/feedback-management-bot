import { type CacheType, type ChatInputCommandInteraction, SlashCommandSubcommandGroupBuilder } from "discord.js";
import type CommandHandler from "./CommandHandler.js";
import type Subcommand from "./Subcommand.js";

export default abstract class SubcommandGroup extends SlashCommandSubcommandGroupBuilder implements CommandHandler {
	public constructor() {
		super();
		for (const subcommand of this.getSubcommands()) {
			super.addSubcommand(subcommand);
		}
	}

	public async handle(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
		const subcommandName = interaction.options.getSubcommand(true);
		const subcommand = this.getSubcommands().find((subcommand) => subcommand.name === subcommandName);

		if (!subcommand) {
			console.error(`No subcommand found with name: ${subcommandName}`);
			return;
		}

		await subcommand.handle(interaction);
	}

	public abstract getSubcommands(): Array<Subcommand>;
}
