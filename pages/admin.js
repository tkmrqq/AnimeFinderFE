import '../src/app/css/globals.css'
import '../src/app/css/admin.css'
import Header from '@/app/Header'
import AddAnime from './admin/add'
import Tabs from '../src/app/tabs'
import PagesLayout from '../src/app/layout'
import LineChart from '../src/app/linecharts'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

import add from '../public/add.svg';
import del from '../public/delete.svg';
import edit from '../public/edit.svg';
import axios from 'axios'

const AdminPanel = () => {
    const [animeList, setAnimeList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [animeToEdit, setAnimeToEdit] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/all')
            .then(response => setAnimeList(response.data))
            .catch(error => console.error('Ошибка:', error));
    }, []);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Форма отправлена');
        togglePopup();
    };

    const tabs = [
        { label: 'Anime list', content: <AnimeListPanel animeList={animeList} togglePopup={togglePopup} setAnimeToEdit={setAnimeToEdit} /> },
        { label: 'Dashboard', content: <div></div> }
    ];

    return (
        <PagesLayout>
            <Header />
            {/* <div className='circle circle-1'></div> */}
            <div className='circle circle-2'></div>
            {/* <div className='circle circle-3'></div> */}
            <div className='circle circle-4'></div>
            <Tabs className='flex flex-col' tabs={tabs} />
            {isOpen && (
                <div className="popup">
                    <div className="popup-inner">
                        <button className="close-btn" onClick={togglePopup}>Close</button>
                        <AddAnime handleSubmit={handleSubmit} animeData={animeToEdit}></AddAnime>
                    </div>
                </div>
            )}
        </PagesLayout>
    )
}

export default AdminPanel;

const StatisticPanel = () => {
    return (
        <div>
            <LineChart />
        </div>
    )
}

const AnimeListPanel = ({ animeList, togglePopup, setAnimeToEdit }) => {
    return (
        <div>
            <div className='flex flex-row justify-center space-x-20'>
                {/* <CreateCard cardTitle='Create anime' svgPath={add} altName="Create anime" panelName="/admin/add" /> */}
            </div>
            <span className='font-bold text-2xl'>All the anime we have:</span>
            <div className='list pt-4'>
                {animeList.map(anime => (
                    <div key={anime.id} className='hover:-translate-y-1 transition ease-linear flex flex-row space-x-8 list-container'>
                        <span className='w-16 text-left'>Id: {anime.id}</span>
                        <Link href={`/anime?title=${encodeURIComponent(anime.name)}`}>
                            <div className='w-96 text-left'>
                                <span>{anime.name}</span>
                            </div>
                        </Link>
                        <EditButton togglePopup={() => {setAnimeToEdit(anime); togglePopup();}} />
                        <DeleteButton animeName={anime.name} />
                    </div>
                ))}
            </div>
        </div>
    )
}

const CreateCard = ({ cardTitle, svgPath, altName, panelName }) => {
    return (
        <Link href={panelName}>
            <div className="w-64 h-96 bg-neutral-800 hover:rotate-3 card hover:scale-105 transition ease-out">
                <Image src={svgPath} alt={altName} width={128} height={128} />
                <span className='caption'>{cardTitle}</span>
            </div>
        </Link>
    )
}

const EditButton = ({ togglePopup }) => {
    return (
        <button onClick={togglePopup}>
            <Image src={edit} alt='Update anime' width={32} height={32} />
        </button>
    )
}

const DeleteButton = ({ animeName }) => {
    const handleClick = async () => {
        if (window.confirm("Are u sure?")) {
            try {
                const response = await axios.delete(`http://localhost:8080/delete?title=${animeName}`);
                console.log(response.data);
            } catch (error) {
                console.error('There was a problem with the axios operation: ' + error.message);
            }
        }
    };
    return (
        <button onClick={handleClick}>
            <Image src={del} alt='Delete anime' width={32} height={32} />
        </button>
    )
}

