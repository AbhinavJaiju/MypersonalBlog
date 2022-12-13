import React, {useState, useEffect, useRef} from 'react'

import { submitComment } from '../../services';

const CommentsForm = ({ slug }: any) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const commentEl : any = useRef();
  const nameEl : any = useRef();
  const emailEl : any = useRef();
  const storeDataEl : any = useRef();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name');
    emailEl.current.value = window.localStorage.getItem('email');
  }, [])
  

  const handleCommentSubmission = () =>{
    setError(false);

    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;

    if(!comment || !name || !email){
      setError(true)
      return;
    }

    const commentObj = {  name, email, comment, slug  };

    if (storeData) {
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('email', email);
    } else {
      window.localStorage.removeItem('name');
      window.localStorage.removeItem('email');
    }

    submitComment(commentObj)
    .then((res) =>{
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    })
  }

  return (
    <div className="bg-transparent shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl text-white mb-8 font-semibold border-b pb-4">Leave a reply</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea 
          ref={commentEl} 
          className='p-4 outline-none text-lg w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 opacity-50'
          placeholder='Comment'
          name='comment'
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 text-xl">
        <input 
          type="text" 
          name="name" 
          placeholder='Name'
          ref={nameEl}
          className='py-2 px-4 outline-none text-lg w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 opacity-50' 
        />
        <input 
          type="text" 
          name="email" 
          placeholder='Email'
          ref={emailEl}
          className='py-2 px-4 outline-none w-full text-lg rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 opacity-50' 
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4 text-lg">
        <div>
          <input type="checkbox" name="storeData" id="storeData" ref={storeDataEl} value="true"/>
          <label className='text-gray-500 text-lg cursor-pointer ml-2' htmlFor='storeData'>Save my e-mail and name for the next time I comment</label>
        </div>
      </div>
      {error && <p className='text-xs text-red-500'>All fields are required</p>}
      <div className="mt-8">
        <button 
          type='button' 
          onClick={handleCommentSubmission}
          className="transition duration-500 ease text-lg hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Post Comment
        </button>
        {showSuccessMessage && <span className='text-xl float-right font-semibold text-green-500'>Comment submitted for review</span>}
      </div>
    </div>
  )
}

export default CommentsForm