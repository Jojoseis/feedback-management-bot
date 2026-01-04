import type Subcommand from "../../../utils/command/Subcommand.ts";
import SubcommandGroup from "../../../utils/command/SubcommandGroup.ts";
import CreateFeedbackCollectionJobCommand from "./create/CreateFeedbackCollectionJobCommand.ts";

export default class FeedbackCollectionJobCommandGroup extends SubcommandGroup {
	public constructor() {
		super();
		this.setName("feedbackcollection");
		this.setDescription("Manage feedback collection jobs");
	}

	public getSubcommands(): Array<Subcommand> {
		return [new CreateFeedbackCollectionJobCommand()];
	}
}
