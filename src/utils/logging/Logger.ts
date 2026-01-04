export default class Logger {
	public static debug(message: string, ...data: Array<unknown>): void {
		console.debug(
			`[DEBUG] ${message}`,
			data.map((item) => (typeof item === "bigint" ? item.toString() : item)),
		);
	}

	public static warn(error: unknown) {
		console.warn("[WARN]", error);
	}

	public static error(error: unknown) {
		console.error("[ERROR]", error);
	}
}
