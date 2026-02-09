import type React from "react";

interface Props {
	title: string;
	link: string;
	imgUrl?: string;
}

const BlogTile: React.FC<Props> = ({ title, link, imgUrl }) => {
	return (
		<a
			className="group relative flex min-h-64 flex-1 gap-5 rounded-sm after:hidden hover:after:hidden focus:after:hidden"
			href={link}
			target="_blank"
			rel="noopener noreferrer"
		>
			<div
				className="absolute inset-0 z-0 rounded-sm bg-center bg-cover"
				style={{ backgroundImage: `url(${imgUrl})` }}
			/>
			<div className="relative z-default flex flex-1 items-end rounded-sm bg-linear-0 from-black to-transparent p-4">
				<span className="font-secondary font-semibold text-2xl text-white group-hover:underline group-focus:underline">
					{title}
				</span>
			</div>
		</a>
	);
};

export default BlogTile;
