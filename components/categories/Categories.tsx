import React, { useState, useEffect, use} from 'react';
import Link from 'next/link';

import { getCategories } from '../../services';

const Categories = () => {
  const [categories, setCategories] = useState([{
      name:'',
      slug:''
  }])

  useEffect(()=>{
    getCategories()
      .then((newCategories) => setCategories(newCategories))
  },[]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 pb-12">
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        Categories
      </h3>
      {categories.map((category) =>(
        <Link key={category.slug} href={`/category/${category.slug}`}>
          <span className="cursor-pointer block pb-3 mb-3 font-semibold transition duration-500 hover:-translate-y-1 inline-block bg-cyan-500 hover:bg-cyan-600 text-lg- font-medium rounded-full text-white px-8 py-3 cursor-pointer mx-2">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  )
}

export default Categories