import type { CacheType, ChatInputCommandInteraction } from "discord.js";
import Command from "./Command.js";
import Subcommand from "./Subcommand.js";
import type SubcommandGroup from "./SubcommandGroup.js";

export default abstract class CommandGroup extends Command {
	public constructor() {
		super();
		for (const subcommand of this.getSubcommands()) {
			if (subcommand instanceof Subcommand) {
				super.addSubcommand(subcommand);
			} else {
				super.addSubcommandGroup(subcommand);
			}
		}
	}

	public async handle(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
		const subcommandName = interaction.options.getSubcommandGroup(true);
		const subcommand = this.getSubcommands().find((subcommandGroup) => subcommandGroup.name === subcommandName);

		if (!subcommand) {
			console.error(`No subcommand group found with name: ${subcommandName}`);
			return;
		}

		await subcommand.handle(interaction);
	}

	public abstract getSubcommands(): Array<Subcommand | SubcommandGroup>;
}
