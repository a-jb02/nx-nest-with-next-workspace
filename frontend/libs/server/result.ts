import { HttpStatusCode } from 'axios'

export type ServerActionResult<T> =
	| { success: true; value: T }
	| { success: false; message: string; errors?: Partial<Record<keyof T, string[]>>; status?: HttpStatusCode }
