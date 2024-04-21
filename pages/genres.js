import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import '../src/app/css/globals.css'
import Header from '@/app/Header';
import PagesLayout from '../src/app/layout';

const GenreList = () => {
    const [animeList, setAnimeList] = useState([]);
    const router = useRouter();
    const { query } = router;
    const genreName = query.genre || '';
    useEffect(() => {
        axios.get('http://localhost:8080/genres/' + genreName)
            .then(response => setAnimeList(response.data))
            .catch(error => console.error('Ошибка:', error));
    }, []);

    return (
        <PagesLayout>
            <Header />
            <h1 className='text-3xl font-extrabold m-10'>Genre: {genreName}</h1>
            <div className='grid grid-cols-5 gap-4 m-10'>
                {animeList.map(anime => (
                    <div key={anime.id} className='w-60 hover:-translate-y-2 transition ease-linear'>
                        <Link href={`/anime?title=${encodeURIComponent(anime.name)}`}>
                            <div>
                                <img className='w-fit rounded-2xl' src={anime.picUrl} alt={anime.name} />
                                <h2>{anime.name}</h2>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </PagesLayout>
    );
};

export default GenreList;
