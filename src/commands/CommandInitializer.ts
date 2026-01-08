import CommandEndpoint from "../utils/interface/CommandEndpoint.js";
import Commands from "./Commands.js";

export default class CommandInitializer {
	public async init() {
		await new CommandEndpoint().bulkOverwrite(Commands);
	}
}
