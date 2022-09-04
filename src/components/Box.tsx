import { PropsWithChildren } from 'react';

type SimpleBoxProps = {
	[inp: string]: any;
} & PropsWithChildren;

export const SimpleBox = ({ children }: SimpleBoxProps) => {
	return (
		<section className="flex justify-start items-center max-w-6xl min-w-[600px] bg-input rounded-xl  px-2 text-text">
			{children}
		</section>
	);
};
