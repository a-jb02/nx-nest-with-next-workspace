import { HttpStatusCode } from 'axios'

export type ServerActionResult<T> =
	| { success: true; value: T }
	| { success: false; error: string; data?: unknown; status?: HttpStatusCode }
