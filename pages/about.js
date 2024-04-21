import '../src/app/css/globals.css'
import PagesLayout from '@/app/layout';
import Header from '@/app/Header';

const aboutPage = () => {
    return (
        <PagesLayout className="min-h-screen flex flex-col">
        <Header/>
        <div className='py-10 mx-auto max-w-7xl flex-grow flex flex-col justify-center'>
        <p className='px-4 md:px-10 lg:px-20 xl:px-80 text-xl'>
            Our team is proud to present you with a unique web service specializing in anime search.
            Our project was created to make life easier for all fans of this Japanese animation by collecting all the necessary information in one place.
            Our service provides an opportunity not only to find any anime, but also to get detailed information about it. 
            When searching, you will see a detailed description, genre, year of release, production studio and many other 
            data that will help you better understand the essence and context of anime.
            We are constantly working to improve our service by adding new features and improving existing ones. 
            Our goal is to make anime search as convenient and informative as possible for you.
            Join us and discover the fascinating new world of anime with our web service!
        </p>
        </div>
        </PagesLayout>
    )
}

export default aboutPage;