import type { CacheType, ChatInputCommandInteraction } from "discord.js";
import UserInputValidator from "../../../../logic/feedbackcollection/UserInputValidator.js";
import FeedbackCollectionConfigurator from "../../../../modal/feedbackcollectionconfigurator/FeedbackCollectionConfigurator.js";
import Subcommand from "../../../../utils/command/Subcommand.js";

export default class CreateFeedbackCollectionJobCommand extends Subcommand {
	public constructor() {
		super();
		this.setName("create");
		this.setDescription("Create a new feedback collection job");
	}

	public async handle(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
		const modalData = await new FeedbackCollectionConfigurator(true).handleModalSubmission(interaction);

		new UserInputValidator(modalData).validate();

		// TODO create job
	}
}
