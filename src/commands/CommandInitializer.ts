import CommandEndpoint from "../utils/interface/CommandEndpoint.ts";
import Commands from "./Commands.ts";

export default class CommandInitializer {
	public async init() {
		await new CommandEndpoint().bulkOverwrite(Commands);
	}
}
