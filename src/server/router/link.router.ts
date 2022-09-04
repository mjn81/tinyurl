import { createRouter } from './context';
import { prisma } from '../db/client';
import { InputLinkSchema, InputSlugSchema } from 'schema';
import { nanoid } from 'nanoid';

export const linkRouter = createRouter()
	.mutation('shorten', {
		input: InputLinkSchema,
		resolve: async ({ input }) => {
			const { url } = input;
			const slug = nanoid(10);
			const link = await prisma.link.create({
				data: {
					link: url,
					slug: slug,
				},
				select: {
					slug: true,
					link: true,
				},
			});
			return link;
		},
	})
	.query('getLink', {
		input: InputSlugSchema,
		resolve: async ({ input }) => {
			const { slug } = input;
			const link = await prisma.link.findUniqueOrThrow({
				where: {
					slug: slug,
				},
				select: {
					slug: true,
					link: true,
				},
			});
			return link;
		},
	});
