import { DomainObjectError } from "../../../errors/domainObjectsErrors/domainObjectErrors";

export class UserError extends DomainObjectError {
	constructor(public message: string) {
		super(message);
		const { red, reset } = DomainObjectError.colors;
		this.name = `${red}UserError${reset}`;
	}
}
