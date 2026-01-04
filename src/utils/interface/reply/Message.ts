import { type InteractionReplyOptions, MessageFlags } from "discord.js";

export default class Message {
	public static ephemeral(string: string): InteractionReplyOptions {
		return {
			content: string,
			flags: MessageFlags.Ephemeral,
		};
	}
}
