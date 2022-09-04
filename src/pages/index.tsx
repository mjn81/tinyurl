import { SimpleBox } from 'components';
import { Button } from 'components/Button';
import { CopyIcon, LoadingIcon, ShortenLinkIcon } from 'icons';
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState, KeyboardEvent } from 'react';
import { trpc } from 'utils/trpc';
import { toast } from 'react-toastify';
import Link from 'next/link';

const Home: NextPage = () => {
	const [shorted, setShorted] = useState<string>('');
	const [link, setLink] = useState<string>('');
	const [submitting, setSubmitting] = useState<boolean>(false);
	const [baseUrl, setBaseUrl] = useState<string>('');
	const { mutateAsync } = trpc.useMutation('link.shorten', {
		onSuccess: (data) => {
			setShorted(data.slug);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	useEffect(() => {
		setBaseUrl(window.location.origin);
	}, []);

	const handleSubmit = () => {
		if (!link) {
			toast.error('Please enter a link');
			return;
		}
		setSubmitting(true);
		mutateAsync({ url: link }).finally(() => setSubmitting(false));
	};
	const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSubmit();
		}
	};
	return (
		<>
			<Head>
				<title>Tiny url</title>
				<meta name="description" content="shorten your link pretty easily" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="space-y-8 flex-col flex justify-center items-center w-screen h-screen text-secondary bg-primary">
				<h1 className="text-text text-6xl capitalize">Tiny url</h1>
				<SimpleBox>
					<input
						onKeyDown={handleEnter}
						spellCheck={false}
						autoFocus
						type="text"
						className="mx-3 my-4 grow bg-input outline-none placeholder:text-textSecondary"
						placeholder="enter url here to shorten"
						value={link}
						onChange={(e) => setLink(e.target.value)}
					/>
					<Button
						autoFocus
						type="submit"
						onClick={handleSubmit}
						disabled={submitting}
					>
						{submitting ? <LoadingIcon /> : <ShortenLinkIcon />}
					</Button>
				</SimpleBox>
				{shorted && (
					<SimpleBox>
						<Link
							href={`${baseUrl}/${shorted}`}
							target="_blank"
							rel="noreferrer"
						>
							<p className="text-text py-4 px-3 underline cursor-pointer">
								{baseUrl}/{shorted}
							</p>
						</Link>
						<span className='grow'></span>
						<Button
							onClick={() =>
								navigator.clipboard.writeText(`${baseUrl}/${shorted}`)
							}
						>
							<CopyIcon />
						</Button>
					</SimpleBox>
				)}
			</main>
		</>
	);
};

export default Home;
