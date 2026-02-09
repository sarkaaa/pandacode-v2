import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import BlogTile from "./BlogTile.tsx";

const BlogPosts = ({ maxPosts = null }: { maxPosts?: number | null }) => {
	const [posts, setPosts] = useState([]);
	const getPostData = () => {
		axios
			.get(
				"https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sarkachwastkova",
			)
			.then((res) => {
				setPosts(res.data.items);
			})
			.catch((error) => {
				console.error("Error fetching blog posts:", error);
			});
	};

	useEffect(() => {
		getPostData();
	});

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-4">
			{posts?.map(({ guid, title, link, description }, index) => {
				if (maxPosts && index >= maxPosts) {
					return null;
				}

				// @biome-ignore lint/suspicious/noExplicitAny: TODO
				const imgUrl = (description as any)
					.toString()
					.match(/<img[^>]+src="([^">]+)"/)[1];

				return (
					<Fragment key={guid}>
						<BlogTile title={title} link={link} imgUrl={imgUrl} />
					</Fragment>
				);
			})}
		</div>
	);
};
export default BlogPosts;
