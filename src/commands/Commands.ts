import type Command from "../utils/command/Command.ts";
import JobCommand from "./job/JobCommand.ts";

const commands: Array<Command> = [new JobCommand()];
export default commands;
