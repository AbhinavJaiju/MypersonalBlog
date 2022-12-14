import React, {useState, useEffect} from 'react';
import moment from 'moment';
import Link from 'next/link';

import { getRecentPosts, getSimilarPosts } from '../../services';

const PostWidget = ({categories , slug} : any) => {
  const [relatedPosts, setRelatedPosts] = useState([{
    featuredImage:{ url : ''},
    title : '',
    slug : '',
    createdAt : ''
  }]);

  useEffect(()=>{
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRelatedPosts(result);
      });
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
      });
    }
  }, [slug]);
  return (
    <div className="bg-transparent shadow-lg rounded-lg p-8 mb-8">
      <h3 className='text-xl mb-8 font-semibold border-b pb-4 text-white'>
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts.map((post, index) => (
        <div key={index} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <img src={post.featuredImage.url} alt={post.title}
            height="60px"
            width="60px"
            className='align-middle rounded-full' />
          </div>
          <div className="flex-grow ml-4 flex flex-row flex-wrap lg:flex-nowrap justify-center text-ellipsis overflow-hidden ...">
            <p className='text-gray-500 font-sx text-lg mx-4'>
              {moment(post.createdAt).format('MMM DD,YYYY')}
            </p>
            <Link href={`/post/${post.slug}`} key= {post.title} className='text-lg text-white'>
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget