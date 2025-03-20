import { ServerActionError } from './errors'
import { ServerActionResult } from './result'

export function createServerAction<Return, Args extends unknown[] = []>(
	callback: (...args: Args) => Promise<Return>
): (...args: Args) => Promise<ServerActionResult<Return>> {
	return async (...args: Args) => {
		try {
			const value = await callback(...args)
			return { success: true, value: value }
		} catch (error) {
			if (error instanceof ServerActionError)
				return {
					success: false,
					message: error.message,
					errors: error.errors as Partial<Record<keyof Return, string[]>>,
					status: error.status
				}
			throw error
		}
	}
}
