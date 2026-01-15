import { ApplicationIntegrationType, InteractionContextType } from "discord.js";
import CommandGroup from "../../utils/command/CommandGroup.js";
import type SubcommandGroup from "../../utils/command/SubcommandGroup.js";
import FeedbackCollectionJobCommandGroup from "./feedbackcollection/FeedbackCollectionJobCommandGroup.js";

export default class JobCommand extends CommandGroup {
	public constructor() {
		super();
		this.setName("job");
		this.setDescription("Job management");

		this.setIntegrationTypes(ApplicationIntegrationType.GuildInstall);
		this.setContexts(InteractionContextType.Guild);
	}

	public getSubcommands(): Array<SubcommandGroup> {
		return [new FeedbackCollectionJobCommandGroup()];
	}
}
