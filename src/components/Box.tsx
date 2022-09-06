import { PropsWithChildren } from 'react';

type SimpleBoxProps = {
	[inp: string]: any;
} & PropsWithChildren;

export const SimpleBox = ({ children , ...others }: SimpleBoxProps) => {
	return (
		<section {...others} className="w-full flex justify-start items-center max-w-[600px] bg-input rounded-xl  px-2 text-text">
			{children}
		</section>
	);
};
