import { fail, redirect, type Actions } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

import type { PageServerLoad } from './$types';

import { createUser } from '$lib/server/repositories/user';
import { makeSession } from '$lib/server/services/session';
import { validateUser } from '$lib/server/services/user';

export const load: PageServerLoad = async function load({ locals }) {
	if (locals.user) throw redirect(307, '/');
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();

		const formData: Record<string, any> = {};
		const { name, username, email, password } = Object.entries(data).reduce((acc, [key, value]) => {
			if (typeof key === 'string') acc[key] = String(value);
			return acc;
		}, formData);

		// const name = String(data.get('name'));
		// const username = String(data.get('username'));
		// const email = String(data.get('email'));
		// const password = String(data.get('password'));

		const validation = await validateUser({
			name,
			username,
			email,
			password
		});

		if (validation.hasErrors === true && validation.errors) {
			const errors = Object.fromEntries(validation.errors);
			return fail(422, { errors });
		}

		const encryptedPassword = await bcrypt.hash(password, 10);

		const userData = {
			name,
			username,
			email,
			password: encryptedPassword
		};

		const user = await createUser(userData);
		await makeSession(user, cookies);

		throw redirect(307, '/');
	}
};
