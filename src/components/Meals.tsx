import { useState, useEffect } from 'react';

interface Meal {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

function Meals() {
  const [loading, setLoading] = useState(true);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(response => response.json())
      .then(data => {
        setMeals(data.categories);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className='text-center py-4'>
        <h1 className='py-8 font-bold text-6xl'>Meal categories:</h1>
        {
          loading ? <p>Loading...</p> :
              <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {meals.map((meal: Meal) => (
                  <li key={meal.idCategory} className='bg-gray-100 p-4 rounded-lg shadow-md flex-col justify-center items-center'>
                    <img src={meal.strCategoryThumb} alt={meal.strCategory} className='py-4 mx-auto'/>
                    <a href={`/recipes?id=${meal.strCategory}`}>
                      <h2 className='font-bold text-xl hover:text-4xl px-6'>{meal.strCategory}</h2>
                    </a>
                  </li>
                ))}
              </ul>
        }
      </div>
    </>
  );
}

export default Meals;
