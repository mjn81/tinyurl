import React from 'react';
import { useRouter } from 'next/router';
import { trpc } from 'utils/trpc';
import { LoadingIcon } from 'icons';

const LinkPage = () => {
	const { id } = useRouter().query;
	trpc.useQuery(['link.getLink', { slug: id as string }], {
		onSuccess: (data) => {
			window.location.replace(data.link);
		},
		onError: (error) => {
			console.log(error);
		},
	});
	return (
		<main className="text-text w-screen h-screen bg-primary flex flex-col justify-center items-center">
      <header className='mb-32'>
        <h1 className="text-8xl">Tiny url</h1>
      </header>
      <LoadingIcon size='w-32 h-32' />
		</main>
	);
};

export default LinkPage;
