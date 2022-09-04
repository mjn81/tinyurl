import { PropsWithChildren } from 'react';

type ButtonProps = {
	[inp: string]: any;
} & PropsWithChildren;


/// className Bugfix
export const Button = ({ children, ...others }: ButtonProps) => {
	return (
		<button
			className="bg-primary transition-all hover:bg-outline py-2 px-4 rounded-lg"
			{...others}
		>
			{children}
		</button>
	);
};
