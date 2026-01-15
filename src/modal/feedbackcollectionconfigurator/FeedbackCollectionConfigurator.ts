import { type CacheType, LabelBuilder, type ModalSubmitInteraction, TextInputBuilder, TextInputStyle } from "discord.js";
import nodeCron from "node-cron";
import UserException from "../../utils/errorhandling/exceptions/UserException.js";
import RegexValidation from "../../utils/validation/RegexValidation.js";
import BaseModal from "../BaseModal.js";

export type FeedbackCollectionConfigurationData = {
	subreddit: string;
	steamAppId: string;
	cronPattern?: string;
	lookbackTime?: string;
};

export default class FeedbackCollectionConfigurator extends BaseModal<FeedbackCollectionConfigurationData> {
	private isJob: boolean;

	public constructor(isJob: boolean) {
		super();
		this.isJob = isJob;
		this.setCustomId("feedbackCollectionConfigurator");
		this.setTitle("Feedback Collection Configurator");
		this.addLabelComponents(new RedditComponent());
		this.addLabelComponents(new SteamComponent());
		if (isJob) {
			this.addLabelComponents(new CronComponent());
		} else {
			this.addLabelComponents(new LookbackTimeComponent());
		}
	}

	protected getSubmitConfiguration() {
		return {
			time: 60_000,
		};
	}

	protected parseData(modalData: ModalSubmitInteraction<CacheType>): FeedbackCollectionConfigurationData {
		const subreddit = modalData.fields.getTextInputValue(RedditInput.ID);
		const steamAppId = modalData.fields.getTextInputValue(SteamInput.ID);

		if (!RegexValidation.isSubreddit(subreddit)) {
			throw new UserException(`'${subreddit}' is not a valid subreddit format`);
		}

		if (!RegexValidation.isInteger(steamAppId)) {
			throw new UserException(`'${steamAppId}' is not a valid Steam app ID`);
		}

		const data: FeedbackCollectionConfigurationData = {
			subreddit: subreddit,
			steamAppId: steamAppId,
		};

		if (this.isJob) {
			const cronPattern = modalData.fields.getTextInputValue(CronInput.ID);

			if (!nodeCron.validate(cronPattern)) {
				throw new UserException(`'${cronPattern}' is not a valid cron pattern`);
			}

			data.cronPattern = cronPattern;
		} else {
			const lookbackTime = modalData.fields.getTextInputValue(LookbackTimeInput.ID);

			if (!RegexValidation.isInteger(lookbackTime)) {
				throw new UserException(`'${lookbackTime}' is not a valid lookback time`);
			}

			data.lookbackTime = lookbackTime;
		}

		return data;
	}
}

class RedditComponent extends LabelBuilder {
	public constructor() {
		super();
		this.setLabel("Subreddit");
		this.setDescription("The subreddit to collect feedback from, starting with 'r/'.");
		this.setTextInputComponent(new RedditInput());
	}
}

class RedditInput extends TextInputBuilder {
	public static readonly ID = "subreddit.js";

	public constructor() {
		super();
		this.setCustomId(RedditInput.ID);
		this.setStyle(TextInputStyle.Short);
		this.setPlaceholder("r/YourSubreddit");
	}
}

class SteamComponent extends LabelBuilder {
	public constructor() {
		super();
		this.setLabel("Steam App ID");
		this.setDescription("The Steam App ID of the game.");
		this.setTextInputComponent(new SteamInput());
	}
}

class SteamInput extends TextInputBuilder {
	public static readonly ID = "steamAppId.js";

	public constructor() {
		super();
		this.setCustomId(SteamInput.ID);
		this.setStyle(TextInputStyle.Short);
		this.setPlaceholder("1234567");
	}
}

class CronComponent extends LabelBuilder {
	public constructor() {
		super();
		this.setLabel("Cron Pattern");
		this.setDescription("The cron pattern used to set up the scheduler for feedback collection.");
		this.setTextInputComponent(new CronInput());
	}
}

class CronInput extends TextInputBuilder {
	public static readonly ID = "cronPattern.js";

	public constructor() {
		super();
		this.setCustomId(CronInput.ID);
		this.setStyle(TextInputStyle.Short);
		this.setPlaceholder("0 0 * * 1 eg. every Monday at midnight");
	}
}

class LookbackTimeComponent extends LabelBuilder {
	public constructor() {
		super();
		this.setLabel("Lookback Time");
		this.setDescription("How far to look back in time for feedback collection.");
		this.setTextInputComponent(new LookbackTimeInput());
	}
}

class LookbackTimeInput extends TextInputBuilder {
	public static readonly ID = "lookbackTime.js";

	public constructor() {
		super();
		this.setCustomId(LookbackTimeInput.ID);
		this.setStyle(TextInputStyle.Short);
		this.setPlaceholder("7 for a full week");
	}
}
