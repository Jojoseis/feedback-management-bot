import { ApplicationIntegrationType, InteractionContextType } from "discord.js";
import CommandGroup from "../../utils/command/CommandGroup";
import type SubcommandGroup from "../../utils/command/SubcommandGroup";
import FeedbackCollectionJobCommandGroup from "./feedbackcollection/FeedbackCollectionJobCommandGroup";

export default class JobCommand extends CommandGroup {
	public constructor() {
		super();
		this.setName("job");
		this.setDescription("Job management");

		this.setIntegrationTypes(ApplicationIntegrationType.GuildInstall);
		this.setContexts(InteractionContextType.Guild);
	}

	public getSubcommandGroups(): Array<SubcommandGroup> {
		return [new FeedbackCollectionJobCommandGroup()];
	}
}
