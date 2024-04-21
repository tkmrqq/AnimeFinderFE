import Link from 'next/link';
import './css/globals.css'
import { useState } from 'react';
import { useRouter } from 'next/router';

const Header = () => {
    const [inputValue, setInputValue] = useState('');
    const router = useRouter();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            router.push(`/anime?title=${inputValue}`);
            console.log("pressed!");
        }
    };

    return (
        <header className='stickyy flex justify-center font-bold'>
            <nav className='space-x-10'>
                <Link href="/">
                    <span>Главная</span>
                </Link>
                <Link href="/about">
                    <span>О нас</span>
                </Link>
                <input value={inputValue} onChange={handleInputChange} type="text" name="search" placeholder="search" className='searchInput' onKeyDown={handleKeyDown}></input>
                <button type="submit" className=""></button>
                <Link href='/admin'>Admin</Link>
            </nav>
        </header>
    )
};

export default Header;