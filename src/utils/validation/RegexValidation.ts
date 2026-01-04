export default class RegexValidation {
	public static isInteger(value: string): boolean {
		return /^\d+$/.test(value);
	}

	public static isSubreddit(value: string): boolean {
		return /^r\/[A-Za-z0-9_]+$/.test(value);
	}
}
