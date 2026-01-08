import type Subcommand from "../../../utils/command/Subcommand.js";
import SubcommandGroup from "../../../utils/command/SubcommandGroup.js";
import CreateFeedbackCollectionJobCommand from "./create/CreateFeedbackCollectionJobCommand.js";

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
