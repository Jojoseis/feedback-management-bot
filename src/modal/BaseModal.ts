import { type AwaitModalSubmitOptions, type CacheType, type CommandInteraction, ModalBuilder, type ModalSubmitInteraction } from "discord.js";
import type JSONObject from "../utils/types/JSONObject.js";

export default abstract class BaseModal<DATA extends JSONObject> extends ModalBuilder {
	public async handleModalSubmission(interaction: CommandInteraction<CacheType>): Promise<DATA> {
		await interaction.showModal(this);
		const modalSubmission = await interaction.awaitModalSubmit(this.getSubmitConfiguration());
		try {
			return this.parseData(modalSubmission);
		} finally {
			await modalSubmission.deferUpdate();
		}
	}

	protected abstract getSubmitConfiguration(): AwaitModalSubmitOptions<ModalSubmitInteraction>;

	protected abstract parseData(modalData: ModalSubmitInteraction<CacheType>): DATA;
}
