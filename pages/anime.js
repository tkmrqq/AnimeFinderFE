'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import '../src/app/css/globals.css'
import Link from "next/link";
import Header from '@/app/Header';
import PagesLayout from "../src/app/layout";
import Image from 'next/image'
import loading from "../public/loading.svg"
import bg from "../public/bg.jpg"

const AnimeInfo = () => {
  const [animeData, setAnimeData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const animeTitle = searchParams.get('title');
    if (animeTitle) {
      console.log(animeTitle)
      axios.get('http://localhost:8080/anime?title=' + animeTitle)
        .then(response => {
          setAnimeData(response.data);
        })
        .catch(error => {
          console.error('Ошибка при получении данных:', error);
        });
    }
  }, [router.query.title]);
  return (
    <div>
      {animeData ? (<AnimeInfoContent animeData={animeData} />) : (<LoadingStatus />)}
    </div>
  );
};

export default AnimeInfo;

const AnimeInfoContent = ({ animeData }) => {
  return (
    <PagesLayout>
      <Header />
      <div className="absolute left-0 w-full h-7 object-cover object-center z-[-2] -top-40">
        {/* <Image className="blur opacity-40" src={bg} /> */}
      </div>
      <div className="m-10 relative z-0">
        <div className="flex flex-row">
          <div className="z-[-1]">
            <div className="absolute top-0 left-40 w-48 h-48 rounded-full bg-gradient-to-r from-blue-400 via-yellow-500 to-green-500 blur-3xl"></div>
            <div className="absolute top-80 w-64 h-64 rounded-full bg-gradient-to-r from-blue-400 to-green-500 scale blur-3xl"></div>
          </div>
          <img
            src={animeData.picUrl}
            className="h-auto w-80 scale-105 rounded-3xl hover:-rotate-3 hover:scale-95 transition ease-out"
            alt="pic"
          />
          <div className="flex flex-col pl-20">
            <h1 className="text-5xl font-extrabold">{animeData.name}</h1>
            <div className="mt-12">
              <div className="font-bold  text-3xl">
                Rating: <span className={animeData.score < 5 ? 'text-red-400' : animeData.score < 8 ? 'text-yellow-400' : 'text-green-400'}>{animeData.score}</span>
              </div>
              <div className="font-light pt-16">
                <h2 className="font-bold  text-xl">Information:</h2>
                <p>Type: {animeData.type}</p>
                <p>Source: {animeData.source}</p>
                <p>Episodes: {animeData.episodes}</p>
                <p>Episode duration: {animeData.duration}</p>
                <p>Genres: {animeData.genres.map((genre) => (
                  <Link className="hover:underline" href={`/genres?genre=${genre.name}`} key={genre.name}>
                    {genre.name}
                  </Link>
                )).reduce((prev, curr, index) => {
                  return index === 0 ? [curr] : [prev, ', ', curr]
                }, [])}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-12">
          <h2 className="font-bold uppercase text-xl">Description:</h2>
          <div className="font-light">
            <p>{animeData.description}</p>
          </div>
        </div>
        <div className="relative min-h-screen">
        </div>
      </div>
    </PagesLayout>
  )
}

const LoadingStatus = () => {
  return (
    <div className="flex relative min-h-screen place-content-center items-center">
      <Image className="animate-spin mr-3" src={loading} alt='loading' width={48} height={48} />
      <p className="font-bold text-4xl">Загрузка...</p>
    </div>
  )
}
