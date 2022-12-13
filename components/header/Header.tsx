import Head from 'next/head';
import Link from 'next/link'
import React, { useState, useEffect, use } from 'react';
import { getCategories } from '../../services';



const Header = () => {
    const [categories, setCategories] = useState([{
        name: '',
        slug: ''
    }])

    useEffect(() => {
        getCategories()
            .then((newCategories) => setCategories(newCategories))
    }, []);
    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="border-b w-full inline-block border-blue-400 py-8">
                <div className="md:float-left block">
                    <Head>
                        <title>Clueless Engineer</title>
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <Link href={"/"}>
                        <span className="cursor-pointer font-bold text-4xl text-white">
                            Clueless Engineer
                        </span>
                    </Link>
                </div>
                <div className='md:hidden '></div>
                <div className="hidden md:float-left md:contents">
                    {categories.map((category) => (
                        <Link key={category.slug} href={`/category/${category.slug}`}>
                            <span className="md:float-right mt-2 align-middle text-white text-xl ml-4 font-semibold cursor-pointer">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Header