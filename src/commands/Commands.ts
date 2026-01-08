import type Command from "../utils/command/Command";
import JobCommand from "./job/JobCommand";

const commands: Array<Command> = [new JobCommand()];
export default commands;
