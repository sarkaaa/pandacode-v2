import React from 'react';

interface Props {
  title: string;
  link: string;
  imgUrl?: string;
}

const BlogTile: React.FC<Props> = ({ title, link, imgUrl }) => {
  return (
    <a 
      className="group relative flex flex-1 gap-5 min-h-64 after:hidden hover:after:hidden focus:after:hidden rounded-sm" 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div 
        className="absolute bg-cover bg-center z-0 inset-0 rounded-sm" 
        style={{ backgroundImage: `url(${imgUrl})` }}
      />
      <div className="p-4 relative z-default flex items-end flex-1 bg-linear-0 from-black to-transparent rounded-sm">
        <span className="font-semibold font-secondary text-white text-2xl group-hover:underline group-focus:underline">
          {title}
        </span>
      </div>
    </a>
  );
};

export default BlogTile;