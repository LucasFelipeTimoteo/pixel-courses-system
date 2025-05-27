export class DomainObjectError extends Error {
	static colors = {
		reset: "\x1b[0m",
		blue: "\x1b[36m",
		red: "\x1b[31m",
		yellow: "\x1b[33m",
		green: "\x1b[32m",
	};

	constructor(public message: string) {
		super(message);

		Error.captureStackTrace(this, this.constructor);
	}
}
