import type { CacheType, ChatInputCommandInteraction } from "discord.js";
import Command from "./Command.ts";
import type SubcommandGroup from "./SubcommandGroup.ts";

export default abstract class CommandGroup extends Command {
	public constructor() {
		super();
		for (const subcommandGroup of this.getSubcommandGroups()) {
			super.addSubcommandGroup(subcommandGroup);
		}
	}

	public async handle(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
		const subcommandGroupName = interaction.options.getSubcommandGroup(true);
		const subcommandGroup = this.getSubcommandGroups().find((subcommandGroup) => subcommandGroup.name === subcommandGroupName);

		if (!subcommandGroup) {
			console.error(`No subcommand group found with name: ${subcommandGroupName}`);
			return;
		}

		await subcommandGroup.handle(interaction);
	}

	public abstract getSubcommandGroups(): Array<SubcommandGroup>;
}
