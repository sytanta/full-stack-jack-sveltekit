import fs from 'fs';
import path from 'path';
import parseMD from 'parse-md';

import type { PageServerLoad } from './$types';

type Meta = { title: string; author: string; date: string };

export const load: PageServerLoad = async function () {
	const articles: { meta: Meta; slug: string }[] = [];
	const filenames = fs.readdirSync('articles');
	filenames.forEach(function (filename) {
		const file = fs.readFileSync('articles/' + filename, 'utf-8');

		const { metadata } = parseMD(file);

		articles.push({ meta: metadata as Meta, slug: path.parse(filename).name });
	});

	return {
		articles
	};
};
