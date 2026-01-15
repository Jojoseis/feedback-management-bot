import { ApplicationIntegrationType, InteractionContextType } from "discord.js";
import CommandGroup from "../../utils/command/CommandGroup.js";
import type Subcommand from "../../utils/command/Subcommand.js";
import type SubcommandGroup from "../../utils/command/SubcommandGroup.js";
import FeedbackCollectionRunCommand from "./feedbackcollection/FeedbackCollectionRunCommand.js";

export default class RunCommand extends CommandGroup {
	public constructor() {
		super();
		this.setName("run");
		this.setDescription("Single runs");

		this.setIntegrationTypes(ApplicationIntegrationType.GuildInstall);
		this.setContexts(InteractionContextType.Guild);
	}

	public getSubcommands(): Array<Subcommand | SubcommandGroup> {
		return [new FeedbackCollectionRunCommand()];
	}
}
