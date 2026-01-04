import type { CacheType, ChatInputCommandInteraction } from "discord.js";

interface CommandHandler {
	handle(interaction: ChatInputCommandInteraction<CacheType>): Promise<void>;
}
export default CommandHandler;
