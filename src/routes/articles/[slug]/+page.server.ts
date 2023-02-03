import fs from 'fs';
import parseMD from 'parse-md';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkEmoji from 'remark-emoji';
import remarkSqueezeParagraphs from 'remark-squeeze-paragraphs';
import rehypeSlug from 'rehype-slug';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSortAttributeValues from 'rehype-sort-attribute-values';
import rehypeSortAttributes from 'rehype-sort-attributes';

import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async function ({ params }) {
	const post = fs.readFileSync('articles/' + `${params['slug']}.md`, 'utf8');

	const { content, metadata } = parseMD(post);
	const meta = metadata as { author: string; title: string; date: string };

	const compiled = await unified()
		.use(remarkParse)
		.use(remarkEmoji)
		.use(remarkSqueezeParagraphs)
		.use(remarkGfm)
		.use(remarkRehype)
		.use(rehypeSlug)
		.use(rehypeExternalLinks)
		.use(rehypeSortAttributeValues)
		.use(rehypeSortAttributes)
		.use(rehypeStringify)
		.process(content);

	return {
		post: {
			author: meta.author,
			title: meta.title,
			date: meta.date,
			content: String(compiled)
		}
	};
};
