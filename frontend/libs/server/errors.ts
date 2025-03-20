import { HttpStatusCode } from 'axios' // TODO: move to types
import { ServerActionsErrorMessages } from './constants'

type ServerActionErrorOptions = {
	message: string
	status: HttpStatusCode
	data?: unknown
}
export class ServerActionError extends Error {
	public status: HttpStatusCode | undefined = undefined
	public data?: unknown
	constructor({
		message = ServerActionsErrorMessages.ERRROR_SOMETHING_WENT_WRONG,
		data,
		status
	}: ServerActionErrorOptions) {
		super(message, { /*cause: data*/ })
		this.status = status
		this.name = 'ServerActionError'
		this.data = data
	}
}

export class ServerActionUnknownError extends ServerActionError {
	constructor({
		message = ServerActionsErrorMessages.ERRROR_SOMETHING_WENT_WRONG,
		data,
		status = HttpStatusCode.InternalServerError
	}: Partial<ServerActionErrorOptions> = {}) {
		super({ message, data, status })
		this.name = 'ServerActionUnknownError'
	}
}

export class ServerActionBadRequestError extends ServerActionError {
	constructor({
		message = ServerActionsErrorMessages.ERRROR_BAD_REQUEST,
		data,
		status = HttpStatusCode.BadRequest
	}: Partial<ServerActionErrorOptions> = {}) {
		super({ message, data, status })
		this.name = 'ServerActionBadRequestError'
	}
}

export class ServerActionFetchError extends ServerActionError {
	constructor({
		message = ServerActionsErrorMessages.ERRROR_FAILED_TO_FETCH_DATA,
		data,
		status = HttpStatusCode.BadRequest
	}: Partial<ServerActionErrorOptions> = {}) {
		super({ message, data, status })
		this.name = 'ServerActionFetchError'
	}
}

export class ServerActionForbiddenError extends ServerActionError {
	constructor({
		message = ServerActionsErrorMessages.ERRROR_FORBIDDEN,
		data,
		status = HttpStatusCode.Forbidden
	}: Partial<ServerActionErrorOptions> = {}) {
		super({ message, data, status })
		this.name = 'ServerActionForbiddenError'
	}
}

export class ServerActionNotFoundError extends ServerActionError {
	constructor({
		message = ServerActionsErrorMessages.ERRROR_NOT_FOUND,
		data,
		status = HttpStatusCode.BadRequest
	}: Partial<ServerActionErrorOptions> = {}) {
		super({ message, data, status })
		this.name = 'ServerActionNotFoundError'
	}
}

export class ServerActionTooManyRequestsError extends ServerActionError {
	constructor({
		message = ServerActionsErrorMessages.ERRROR_TOO_MANY_REQUESTS,
		data,
		status = HttpStatusCode.TooManyRequests
	}: Partial<ServerActionErrorOptions> = {}) {
		super({ message, data, status })
		this.name = 'ServerActionTooManyRequestsError'
	}
}

export class ServerActionUnauthorizedError extends ServerActionError {
	constructor({
		message = ServerActionsErrorMessages.ERRROR_UNAUTHORIZED,
		data,
		status = HttpStatusCode.Unauthorized
	}: Partial<ServerActionErrorOptions> = {}) {
		super({ message, data, status })
		this.name = 'ServerActionUnauthorizedError'
	}
}

export class ServerActionConflictError extends ServerActionError {
	constructor({
		message = ServerActionsErrorMessages.ERRROR_CONFLICT,
		data,
		status = HttpStatusCode.Conflict
	}: Partial<ServerActionErrorOptions> = {}) {
		super({ message, data, status })
		this.name = 'ServerActionConflictError'
	}
}

export class ServerActionNotImplementedError extends ServerActionError {
	constructor({
		message = ServerActionsErrorMessages.ERRROR_NOT_IMPLEMENTED,
		data,
		status = HttpStatusCode.NotImplemented
	}: Partial<ServerActionErrorOptions> = {}) {
		super({ message, data, status })
		this.name = 'ServerActionNotImplementedError'
	}
}

export class ServerActionSyntaxError extends ServerActionError {
	constructor({
		message = ServerActionsErrorMessages.ERROR_SYNTAX_ERROR,
		data,
		status = HttpStatusCode.UnprocessableEntity
	}: Partial<ServerActionErrorOptions> = {}) {
		super({ message, data, status })
		this.name = 'ServerActionSyntaxError'
	}
}

export class ServerActionValidationError extends ServerActionError {
	constructor({
		message = ServerActionsErrorMessages.ERROR_UNPROCESSABLE_ENTITY,
		data,
		status = HttpStatusCode.UnprocessableEntity
	}: Partial<ServerActionErrorOptions> = {}) {
		super({ message, data, status })
		this.name = 'ServerActionValidationError'
	}
}
