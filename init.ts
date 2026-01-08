import "dotenv/config.js";
import CommandInitializer from "./src/commands/CommandInitializer.js";

console.log("Initializing commands...");
await new CommandInitializer().init();
console.log("Commands initialized.");
