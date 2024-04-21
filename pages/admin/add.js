import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../../src/app/css/globals.css'
import '../../src/app/css/form.css'

const AddAnime = ({ animeData, handleFormSubmit }) => {
    const [anime, setAnime] = useState(animeData || {
        source: '',
        type: '',
        episodes: '',
        score: '',
        duration: '',
        picUrl: '',
        genres: [{ name: '' }],
        titlesList: [{ title: '', type: '' }]
    });

    useEffect(() => {
        if (animeData) {
            setAnime(animeData);
        }
    }, [animeData]);

    const handleChange = (e, field, i, subField) => {
        const newAnime = { ...anime };
        if (Array.isArray(newAnime[field])) {
            newAnime[field] = newAnime[field].map((item, index) => {
                if (index === i) {
                    return { ...item, [subField]: e.target.value };
                } else {
                    return item;
                }
            });
        } else {
            newAnime[field] = e.target.value;
        }
        setAnime(newAnime);
    };

    const handleAdd = (field) => {
        const newAnime = { ...anime };
        newAnime[field].push({ title: '', type: '' });
        setAnime(newAnime);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(anime);
            if (animeData) {
                const response = await axios.put(`http://localhost:8080/put?title=${encodeURIComponent(anime.name)}`, anime);
                alert("Successfully updated");
                console.log(response.data);
            } else {
                const response = await axios.post('http://localhost:8080/post', anime);
                alert("Successfully added");
                console.log(response.data);
            }
            setAnime({
                source: '',
                type: '',
                episodes: '',
                score: '',
                duration: '',
                picUrl: '',
                genres: [{ name: '' }],
                titlesList: [{ title: '', type: '' }]
            });
            handleFormSubmit();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col content">
                <h1 className="text-xl font-bold">{animeData ? 'Update' : 'Add'} anime in database</h1>
                <input defaultValue={anime.name} type="text" name="name" onChange={(e) => handleChange(e, 'name')} placeholder="Name" required />
                <textarea defaultValue={anime.description} name="description" onChange={(e) => handleChange(e, 'description')} placeholder="Description" required></textarea>
                <select defaultValue={anime.source} name="source" onChange={(e) => handleChange(e, 'source')} required>
                    <option value="">Выберите источник</option>
                    <option value="Manga">Manga</option>
                    <option value="Original">Original</option>
                    <option value="Ranobe">Ranobe</option>
                    <option value="Novele">Novele</option>
                    <option value="Manhwa">Manhwa</option>
                </select>
                <select defaultValue={anime.type} name="type" onChange={(e) => handleChange(e, 'type')} required>
                    <option value="">Выберите тип</option>
                    <option value="TV">TV</option>
                    <option value="Movie">Movie</option>
                </select>
                <input defaultValue={anime.episodes} type="number" min="1" name="episodes" onChange={(e) => handleChange(e, 'episodes')} placeholder="Episodes" required />
                <input defaultValue={anime.score} type="number" min="0" max="10" step="0.01" name="score" onChange={(e) => handleChange(e, 'score')} placeholder="Score" required />
                <input defaultValue={anime.duration} type="text" name="duration" onChange={(e) => handleChange(e, 'duration')} placeholder="Duration" required />
                <input defaultValue={anime.picUrl} type="url" name="picUrl" onChange={(e) => handleChange(e, 'picUrl')} placeholder="Picture URL" required />
                {anime.genres.map((genre, i) => (
                    <div key={i}>
                        <input type="text" value={genre.name} onChange={(e) => handleChange(e, 'genres', i, 'name')} placeholder={`Genre ${i + 1}`} required />
                        {i === anime.genres.length - 1 && <button type="button" onClick={() => handleAdd('genres')}>Добавить жанр</button>}
                    </div>
                ))}
                {anime.titlesList.map((title, i) => (
                    <div key={i}>
                        <input type="text" value={title.title || ''} onChange={(e) => handleChange(e, 'titlesList', i, 'title')} placeholder={`Title ${i + 1}`} required />
                        <input type="text" value={title.type || ''} onChange={(e) => handleChange(e, 'titlesList', i, 'type')} placeholder={`Type ${i + 1}`} required />
                        {i === anime.titlesList.length - 1 && <button type="button" onClick={() => handleAdd('titlesList')}>Add Title</button>}
                    </div>
                ))}
                <button type="submit">{animeData ? 'Update anime' : 'Add anime'}</button>
            </form>
        </div>
    );
};

export default AddAnime;
