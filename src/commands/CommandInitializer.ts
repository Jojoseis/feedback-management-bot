import CommandEndpoint from "../utils/interface/CommandEndpoint";
import Commands from "./Commands";

export default class CommandInitializer {
	public async init() {
		await new CommandEndpoint().bulkOverwrite(Commands);
	}
}
