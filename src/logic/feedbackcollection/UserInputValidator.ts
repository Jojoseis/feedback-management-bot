import type { FeedbackCollectionConfigurationData } from "../../modal/feedbackcollectionconfigurator/FeedbackCollectionConfigurator.js";
import UserException from "../../utils/errorhandling/exceptions/UserException.js";

type RedditResponse = {
	kind: string;
	data: Record<string, unknown>;
};

export default class UserInputValidator {
	private modalData: FeedbackCollectionConfigurationData;

	public constructor(modalData: FeedbackCollectionConfigurationData) {
		this.modalData = modalData;
	}

	public async validate() {
		const redditResponse = await fetch(`https://www.reddit.com/${this.modalData.subreddit}/about.json`);

		const redditResponseJson = (await redditResponse.json()) as RedditResponse;
		if (redditResponseJson?.data?.subreddit_type !== "public") {
			throw new UserException(
				`Subreddit '${this.modalData.subreddit}' is invalid or not publicly available. Please provide a valid subreddit.`,
			);
		}

		const steamResponse = await fetch(`https://store.steampowered.com/app/${this.modalData.steamAppId}`);

		const isRedirectToLandingPage = /<title>Welcome to Steam<\/title>/.test(await steamResponse.text());
		if (isRedirectToLandingPage) {
			throw new UserException(`Steam App ID '${this.modalData.steamAppId}' is invalid. Please provide a valid Steam App ID.`);
		}
	}
}
