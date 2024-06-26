import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFavorite from '../hooks/useFavorite.ts';

interface RecipeResponse {
    idMeal: string;
    strCategory: string;
    strMeal: string;
    strInstructions: string;
    strMealThumb: string;
    strYoutube: string;
}

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const Recipe = () => {
    const { addFavorite, removeFavorite, isFavorite } = useFavorite();
    const [loading, setLoading] = useState(true);
    const [recipe, setRecipe] = useState<RecipeResponse | null>(null);
    const query = useQuery();
    const id = query.get('id');

    useEffect(() => {
        if (id) {
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                .then(response => response.json())
                .then(data => {
                    if (data.meals) {
                        setRecipe(data.meals[0]);
                    } else {
                        console.error('No meals found');
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!recipe) {
        return (
            <>
                <div className='bg-gray-300 py-60 dark:bg-slate-700'>
                    <h1 className='text-6xl font-bold text-center dark:text-slate-100'>No recipe found</h1>
                </div>
            </>
        );
    }

    return (
        <div className='text-center py-4 bg-gray-300 dark:bg-slate-700 md:flex'>
            <div className='md:flex-col md:w-1/2'>
                <h1 className='mt-8 font-bold text-6xl dark:text-slate-100'>Recipe:</h1>
                <div className='my-6'>
                    <h2 className='font-bold text-4xl dark:text-slate-100'>{recipe.strMeal}</h2>
                    <h3 className='font-bold text-3xl pt-8 dark:text-slate-100'>Category: {recipe.strCategory}</h3>
                    {
                        isFavorite(parseInt(recipe.idMeal)) ?
                            <button onClick={() => removeFavorite(parseInt(recipe.idMeal))} className='mt-8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Remove from Favorites</button> :
                            <button onClick={() => addFavorite({ id: parseInt(recipe.idMeal), name: recipe.strMeal, url: recipe.strMealThumb })} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-8'>Add to Favorites</button>
                    }
                    <img src={recipe.strMealThumb} alt={recipe.strMeal} className='h-auto rounded-full mx-auto my-6 w-2/5 shadow-xl mt-12 md:w-1/2 lg:w-3/5 mb-12' />
                </div>
            </div>
            <div className=' md:w-1/2 w-full mx-auto mr-8'>
                <div className='shadow-xl my-8 dark:bg-zinc-700 bg-indigo-200'>
                    <h2 className='dark:text-slate-100 text-6xl font-bold py-8'>Instructions</h2>
                    <p className='text-lg text-justify px-16 py-8 dark:text-slate-100'>{recipe.strInstructions}</p>
                </div>
                <div className='my-8'>
                    <a href={recipe.strYoutube} target='_blank' rel='noreferrer' className='text-2xl text-black hover:text-gray-600 dark:text-slate-100 dark:hover:text-zinc-300'>Watch on Youtube</a>
                </div>
            </div>
        </div>
    );
}

export default Recipe;
