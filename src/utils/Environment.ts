export default class Environment {
	public static getAppId(): string {
		return Environment.get("APP_ID");
	}

	public static getPublicKey(): string {
		return Environment.get("PUBLIC_KEY");
	}

	public static getDiscordToken(): string {
		return Environment.get("DISCORD_TOKEN");
	}

	private static get(key: string): string {
		const value = process.env[key];

		if (value === undefined) {
			Environment.handleMissing(key);
		}

		return value;
	}

	private static handleMissing(key: string): never {
		throw new Error(`Failed to find environment variable: ${key}.`);
	}
}
