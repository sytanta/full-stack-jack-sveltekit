import { fail, redirect, type Actions } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

import type { PageServerLoad } from './$types';

import { getUserByEmail } from '$lib/server/repositories/user';
import { deleteSession, makeSession } from '$lib/server/services/session';

export const load: PageServerLoad = async function ({ locals }) {
	if (locals.user) throw redirect(307, '/');
};

export const actions: Actions = {
	signin: async ({ cookies, request }) => {
		const data = await request.formData();
		const usernameOrEmail = String(data.get('usernameOrEmail'));
		const password = String(data.get('password'));

		if (!password) {
			return fail(404, { errors: { password: { message: 'Password required' } } });
		}

		const userDB = await getUserByEmail(usernameOrEmail);

		if (!userDB) {
			return fail(404, { errors: { usernameOrEmail: { message: 'User not found' } } });
		}

		const isPasswordCorrect = await bcrypt.compare(password, userDB.password!);
		if (!isPasswordCorrect) {
			return fail(400, { errors: { common: { message: 'Invalid credentials' } } });
		}

		try {
			await makeSession(userDB, cookies);
		} catch (e) {
			return fail(500, {
				errors: { common: { message: 'Error logging in user, please try again later' } }
			});
		}

		throw redirect(307, '/');
	},

	signout: async ({ cookies }) => {
		await deleteSession(cookies);
	}
};
