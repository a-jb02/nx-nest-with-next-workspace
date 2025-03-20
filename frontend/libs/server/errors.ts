import { HttpStatusCode } from 'axios' // TODO: move to types
import { ServerActionsErrorMessages } from './constants'

type ServerActionErrorOptions = {
	message: string
	status: HttpStatusCode
	errors?: unknown
}
export class ServerActionError extends Error {
	public status: HttpStatusCode | undefined = undefined
	public errors?: unknown
	constructor({
		message = ServerActionsErrorMessages.ERRROR_SOMETHING_WENT_WRONG,
		errors,
		status
	}: ServerActionErrorOptions) {
		super(message, { /*cause: data*/ })
		this.status = status
		this.name = 'ServerActionError'
		this.errors = errors
	}
}

export class ServerActionUnknownError extends ServerActionError {
	constructor({
		message = ServerActionsErrorMessages.ERRROR_SOMETHING_WENT_WRONG,
		errors,
		status = HttpStatusCode.InternalServerError
	}: Partial<ServerActionErrorOptions> = {}) {
		super({ message, errors, status })
		this.name = 'ServerActionUnknownError'
	}
}

export class ServerActionBadRequestError extends ServerActionError {
	constructor({
		message = ServerActionsErrorMessages.ERRROR_BAD_REQUEST,
		errors,
		status = HttpStatusCode.BadRequest
	}: Partial<ServerActionErrorOptions> = {}) {
		super({ message, errors, status })
		this.name = 'ServerActionBadRequestError'
	}
}

export class ServerActionFetchError extends ServerActionError {
	constructor({
		message = ServerActionsErrorMessages.ERRROR_FAILED_TO_FETCH_DATA,
		errors,
		status = HttpStatusCode.BadRequest
	}: Partial<ServerActionErrorOptions> = {}) {
		super({ message, errors, status })
		this.name = 'ServerActionFetchError'
	}
}

export class ServerActionForbiddenError extends ServerActionError {
	constructor({
		message = ServerActionsErrorMessages.ERRROR_FORBIDDEN,
		errors,
		status = HttpStatusCode.Forbidden
	}: Partial<ServerActionErrorOptions> = {}) {
		super({ message, errors, status })
		this.name = 'ServerActionForbiddenError'
	}
}

export class ServerActionNotFoundError extends ServerActionError {
	constructor({
		message = ServerActionsErrorMessages.ERRROR_NOT_FOUND,
		errors,
		status = HttpStatusCode.BadRequest
	}: Partial<ServerActionErrorOptions> = {}) {
		super({ message, errors, status })
		this.name = 'ServerActionNotFoundError'
	}
}

export class ServerActionTooManyRequestsError extends ServerActionError {
	constructor({
		message = ServerActionsErrorMessages.ERRROR_TOO_MANY_REQUESTS,
		errors,
		status = HttpStatusCode.TooManyRequests
	}: Partial<ServerActionErrorOptions> = {}) {
		super({ message, errors, status })
		this.name = 'ServerActionTooManyRequestsError'
	}
}

export class ServerActionUnauthorizedError extends ServerActionError {
	constructor({
		message = ServerActionsErrorMessages.ERRROR_UNAUTHORIZED,
		errors,
		status = HttpStatusCode.Unauthorized
	}: Partial<ServerActionErrorOptions> = {}) {
		super({ message, errors, status })
		this.name = 'ServerActionUnauthorizedError'
	}
}

export class ServerActionConflictError extends ServerActionError {
	constructor({
		message = ServerActionsErrorMessages.ERRROR_CONFLICT,
		errors,
		status = HttpStatusCode.Conflict
	}: Partial<ServerActionErrorOptions> = {}) {
		super({ message, errors, status })
		this.name = 'ServerActionConflictError'
	}
}

export class ServerActionNotImplementedError extends ServerActionError {
	constructor({
		message = ServerActionsErrorMessages.ERRROR_NOT_IMPLEMENTED,
		errors,
		status = HttpStatusCode.NotImplemented
	}: Partial<ServerActionErrorOptions> = {}) {
		super({ message, errors, status })
		this.name = 'ServerActionNotImplementedError'
	}
}

export class ServerActionSyntaxError extends ServerActionError {
	constructor({
		message = ServerActionsErrorMessages.ERROR_SYNTAX_ERROR,
		errors,
		status = HttpStatusCode.UnprocessableEntity
	}: Partial<ServerActionErrorOptions> = {}) {
		super({ message, errors, status })
		this.name = 'ServerActionSyntaxError'
	}
}

export class ServerActionValidationError extends ServerActionError {
	constructor({
		message = ServerActionsErrorMessages.ERROR_UNPROCESSABLE_ENTITY,
		errors,
		status = HttpStatusCode.UnprocessableEntity
	}: Partial<ServerActionErrorOptions> = {}) {
		super({ message, errors, status })
		this.name = 'ServerActionValidationError'
	}
}
