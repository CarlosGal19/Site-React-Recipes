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
        return <p>No recipe found</p>;
    }

    return (
        <div className='text-center py-4'>
            <h1 className='py-8 font-bold text-6xl'>Recipe:</h1>
            <div className='py-8'>
                <h2 className='font-bold text-4xl'>{recipe.strMeal}</h2>
                <h3 className='font-bold text-3xl pt-8'>Category: {recipe.strCategory}</h3>
                {
                    isFavorite( parseInt(recipe.idMeal) ) ?
                        <button onClick={() => removeFavorite( parseInt(recipe.idMeal) )} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4'>Remove from Favorites</button> :
                        <button onClick={() => addFavorite({ id: parseInt(recipe.idMeal), name: recipe.strMeal, url: recipe.strMealThumb })} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4'>Add to Favorites</button>
                }
                <img src={recipe.strMealThumb} alt={recipe.strMeal} className='h-auto rounded-full mx-auto my-6 w-1/4' />
                <p className='text-lg text-justify px-36 py-8'>{recipe.strInstructions}</p>
                <a href={recipe.strYoutube} target='_blank' rel='noreferrer' className='text-blue-500 hover:text-blue-700 text-2xl'>Watch on Youtube</a>
            </div>
        </div>
    );
}

export default Recipe;
