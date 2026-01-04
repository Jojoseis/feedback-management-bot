import { type CacheType, type ChatInputCommandInteraction, SlashCommandSubcommandBuilder } from "discord.js";
import type CommandHandler from "./CommandHandler.ts";

export default abstract class Subcommand extends SlashCommandSubcommandBuilder implements CommandHandler {
	public abstract handle(interaction: ChatInputCommandInteraction<CacheType>): Promise<void>;
}
