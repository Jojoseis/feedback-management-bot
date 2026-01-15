import type { CacheType, ChatInputCommandInteraction } from "discord.js";
import SteamFeedbackCollector from "../../../logic/feedbackcollection/SteamFeedbackCollector.js";
import UserInputValidator from "../../../logic/feedbackcollection/UserInputValidator.js";
import FeedbackCollectionConfigurator from "../../../modal/feedbackcollectionconfigurator/FeedbackCollectionConfigurator.js";
import Subcommand from "../../../utils/command/Subcommand.js";

export default class FeedbackCollectionRunCommand extends Subcommand {
	public constructor() {
		super();
		this.setName("feedbackcollection");
		this.setDescription("Collect feedback for a specified timeframe.");
	}

	public async handle(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
		const modalData = await new FeedbackCollectionConfigurator(false).handleModalSubmission(interaction);

		new UserInputValidator(modalData).validate();

		new SteamFeedbackCollector(modalData.steamAppId).collectFeedback();
	}
}
