import { getUserByEmail, getUserByUserName } from '$lib/server/repositories/user';

import type { AppUser, RegistrationRequest } from '$lib/types';

type ErrorKeys = keyof RegistrationRequest;

export async function validateUser(data: RegistrationRequest) {
	const errors = await validate(data);

	if (errors.size > 0) {
		return { hasErrors: true, errors };
	}

	return { hasErrors: false };
}

export function sanitizeUserForFrontend(user: AppUser | null) {
	if (!user) {
		return null;
	}

	return {
		name: user.name,
		email: user.email,
		username: user.username
	};
}

export async function validate(data: RegistrationRequest) {
	const errors = new Map<ErrorKeys, { message: string }>();

	for (const [key, value] of Object.entries(data)) {
		let val = await validateRegistrationKeyValue(key as ErrorKeys, value);

		if (val.hasError) {
			errors.set(key as ErrorKeys, { message: val.errorMessage! });
		}
	}

	return errors;
}

async function validateRegistrationKeyValue(key: ErrorKeys, value: string) {
	const check: {
		value: string;
		isBlank: boolean;
		lenghtMin8: boolean;
		key: string;
		hasError: boolean;
		emailTaken?: boolean;
		usernameTaken?: boolean;
		errorMessage?: string;
	} = {
		value,
		isBlank: false,
		lenghtMin8: true,
		key,
		hasError: false
	};

	if (key === 'password') {
		if (value.length < 8) {
			check.hasError = true;
			check.errorMessage = 'Password must be at least 8 characters';
		}
		check.lenghtMin8 = false;
	}

	if (key === 'email') {
		const email = await getUserByEmail(value);
		if (email) {
			check.emailTaken = true;
			check.hasError = true;
			check.errorMessage = 'Email is invalid or already taken';
		}
	}

	if (key === 'username') {
		const username = await getUserByUserName(value);
		if (username) {
			check.usernameTaken = true;
			check.hasError = true;
			check.errorMessage = 'Username is invalid or already taken';
		}
	}

	return check;
}
