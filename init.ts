import "dotenv/config";
import CommandInitializer from "./src/commands/CommandInitializer";

console.log("Initializing commands...");
await new CommandInitializer().init();
console.log("Commands initialized.");
