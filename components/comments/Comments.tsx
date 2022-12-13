import React, { useState, useEffect} from 'react';
import moment from 'moment';
import parse from 'html-react-parser'

import { getComments } from '../../services';

const Comments = ({ slug }: any) => {
  const [comments, setComments] = useState([{
    name:'',
    createdAt : '',
    comment: ''
  }]);

  useEffect(() => {
    getComments(slug)
    .then((result) => setComments(result))
  }, [])
  
  return (
    <>
    {comments.length > 0 && (
        <div className="bg-transparent shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4 text-white">
            {comments.length}
            {' '}
            Comments
          </h3>
          {comments.map((comment) =>(
            <div key={comment.createdAt} className='border-b text-base border-gray-100 mb-4 pb-4 text-white'>
              <p className="mb-4">
                <span className='font-semibold'>{comment.name}</span>
                {' '}
                on
                {' '}
                {moment(comment.createdAt).format('MMM DD, YYYY')}
              </p>
              <p className="whitespace-pre-line text-xl text-gray-600 w-full text-white">
                {parse(comment.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Comments