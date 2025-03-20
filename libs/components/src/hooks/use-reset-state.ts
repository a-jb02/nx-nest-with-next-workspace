
'use client';

import React from 'react';

type StateWithReset<T> = [T, React.Dispatch<React.SetStateAction<T>>, () => void]

export const useStateWithReset = <T>(
	initialState: T | (() => T)
): StateWithReset<T> => {
	// Initialize state
	const [state, setState] = React.useState(initialState)

	// Reset state to initial state
	const reset = React.useCallback(() => {
		setState(initialState)
	}, [initialState])

	// Return state, setState and reset function
	return [state, setState, reset]
}