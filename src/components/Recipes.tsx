import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Recipes = () => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  // const [error, setError] = useState<string | null>(null);
  const query = useQuery();
  const id = query.get('id');

  useEffect(() => {
    if (id) {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`)
        .then(response => response.json())
        .then(data => {
          setRecipes(data.meals);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          // setError('Error fetching data');
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!recipes) {
    return (
        <>
            <div className='bg-gray-300 py-60'>
                <h1 className='text-6xl font-bold text-center'>No category found</h1>
            </div>
        </>
    );
}

  return (
    <div className='text-center py-4 bg-gray-300'>
      <h1 className='py-8 font-bold text-6xl'>Recipes of category: {id}</h1>
      {loading ? (
        <p className='text-2xl'>Loading...</p>
      ) : (
        <div className='py-8'>
          {recipes.length > 0 ? (
            <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
              {recipes.map(recipe => (
                <li key={recipe.idMeal} className='py-8 text-center bg-indigo-200 rounded-lg shadow-xl'>
                  <img src={recipe.strMealThumb} alt={recipe.strMeal} className='w-3/4 h-auto rounded-full mx-auto my-6' />
                  <a href={`/recipe?id=${recipe.idMeal}`}>
                    <h2 className='font-bold text-xl hover:text-4xl px-6'>{recipe.strMeal}</h2>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-2xl'>There´s no recipes</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Recipes;
