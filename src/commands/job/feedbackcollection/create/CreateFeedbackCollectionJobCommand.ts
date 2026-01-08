import type { CacheType, ChatInputCommandInteraction } from "discord.js";
import FeedbackCollectionConfigurator from "../../../../modal/feedbackcollectionconfigurator/FeedbackCollectionConfigurator.js";
import Subcommand from "../../../../utils/command/Subcommand.js";
import UserException from "../../../../utils/errorhandling/exceptions/UserException.js";

type RedditResponse = {
	kind: string;
	data: Record<string, unknown>;
};

export default class CreateFeedbackCollectionJobCommand extends Subcommand {
	public constructor() {
		super();
		this.setName("create");
		this.setDescription("Create a new feedback collection job");
	}

	public async handle(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
		const modalData = await new FeedbackCollectionConfigurator().handleModalSubmission(interaction);

		const redditResponse = await fetch(`https://www.reddit.com/${modalData.subreddit}/about.json`);

		const redditResponseJson = (await redditResponse.json()) as RedditResponse;
		if (redditResponseJson?.data?.subreddit_type !== "public") {
			throw new UserException(`Subreddit '${modalData.subreddit}' is invalid or not publicly available. Please provide a valid subreddit.`);
		}

		const steamResponse = await fetch(`https://store.steampowered.com/app/${modalData.steamAppId}`);

		const isRedirectToLandingPage = /<title>Welcome to Steam<\/title>/.test(await steamResponse.text());
		if (isRedirectToLandingPage) {
			throw new UserException(`Steam App ID '${modalData.steamAppId}' is invalid. Please provide a valid Steam App ID.`);
		}
	}
}
