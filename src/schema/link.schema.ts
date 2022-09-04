import { z } from 'zod';

export const InputLinkSchema = z.object({
	url: z.string().url({ message: 'Invalid URL' }),
});
export type InputLinkType = z.infer<typeof InputLinkSchema>;

export const InputSlugSchema = z.object({
	slug: z.string().min(9, { message: 'Slug must be at least 9 characters' }),
});
export type InputSlugType = z.infer<typeof InputSlugSchema>;
