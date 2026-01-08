import type Command from "../utils/command/Command.js";
import JobCommand from "./job/JobCommand.js";

const commands: Array<Command> = [new JobCommand()];
export default commands;
