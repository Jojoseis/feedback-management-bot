import { type CacheType, type ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import type CommandHandler from "./CommandHandler.js";

export default abstract class Command extends SlashCommandBuilder implements CommandHandler {
	public abstract handle(interaction: ChatInputCommandInteraction<CacheType>): Promise<void>;
}
