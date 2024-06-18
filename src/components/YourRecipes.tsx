import { useState, ChangeEvent, useEffect } from "react";

interface Recipe {
  id: number;
  name: string;
  time: string;
  description: string;
}

function YourRecipes() {
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [nuevoRecipe, setNuevoRecipe] = useState<Recipe>({ id: 0, name: '', time: '', description: '' });

  const nuevoRecipeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoRecipe(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    const getLocal = () => {
      const storedRecipes = localStorage.getItem("yourRecipes");
      if (storedRecipes) {
        setRecipes(JSON.parse(storedRecipes));
      }
    }
    getLocal();
  }, []);

  const handleAgregarRecipe = () => {
    if (nuevoRecipe.name && nuevoRecipe.time && nuevoRecipe.description) {
      const updatedRecipes = [...recipes, { ...nuevoRecipe, id: Date.now() }];
      setRecipes(updatedRecipes);
      localStorage.setItem("yourRecipes", JSON.stringify(updatedRecipes));
      setNuevoRecipe({ id: 0, name: '', time: '', description: '' });
      console.log('Recipe added:', nuevoRecipe);
    }
    setIsEditting(false);
  };

  const handleEdit = () => {
    setIsEditting(true);
  };

  const handleViewRecipes = () => {
    setIsEditting(false);
  };

  const handleRemove = (id: number) => {
    const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
    localStorage.setItem("yourRecipes", JSON.stringify(updatedRecipes));
    setRecipes(updatedRecipes);
  }

  return (
    <div className="w-5/6 mx-auto">
      <div className="inner-container">
        <div className="text-center">
          {!isEditting && (
            <h1 className="mt-8 font-bold text-6xl dark:text-slate-100 my-8">Your Recipes:</h1>
          )}
          {isEditting ? (
            <div>
              <h2 className="dark:text-slate-100 text-6xl font-bold py-8">Add New Recipe</h2>
              <div>
                <form className="text-lg px-16 text-center">
                  <div className="my-3">
                    <label className="dark:text-slate-100 text-xl font-bold mx-8">
                      Name:
                    </label>
                    <input type="text" name="name" className="rounded-md" value={nuevoRecipe.name} onChange={nuevoRecipeChange} />
                  </div>
                  <div className="my-3">
                    <label className="dark:text-slate-100 text-xl font-bold mx-8">
                      Time:
                    </label>
                    <input type="text" name="time" className="rounded-md" value={nuevoRecipe.time} onChange={nuevoRecipeChange} />
                  </div>
                  <div className="my-3">
                    <label className="dark:text-slate-100 text-xl font-bold mx-2">
                      Description:
                    </label>
                    <input type="text" name="description" className="rounded-md" value={nuevoRecipe.description} onChange={nuevoRecipeChange} />
                  </div>
                  <button type="button" onClick={handleAgregarRecipe} className="my-8 py-3 bg-green-500 hover:bg-green-700 px-2 rounded-xl text-white font-bold">Add Recipe</button>
                </form>
              </div>
              <button type="button" className="my-8 py-3 bg-indigo-500 hover:bg-indigo-700 px-2 rounded-xl text-white font-bold" onClick={handleViewRecipes}>View Recipes</button>
            </div>
          ) : (
            <div>
              {recipes.length > 0 ? (
                <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                  {recipes.map((recipe) => (
                    <li key={recipe.id} className='p-4 rounded-lg shadow-md flex-col justify-center items-center bg-indigo-200 dark:bg-zinc-700'>
                      <h2 className="dark:text-slate-100 font-bold text-3xl my-6">{recipe.name}</h2>
                      <p className="dark:text-slate-100 text-xl my-4">{recipe.time}</p>
                      <p className="dark:text-slate-100 text-xl my-4">{recipe.description}</p>
                      <button id={`${recipe.id}`} className="text-slate-100 font-bold rounded-xl bg-red-500 hover:bg-red-700 px-4 py-2" onClick={() => handleRemove(recipe.id)}>Remove</button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex justify-center items-center h-96">
                  <h2 className="text-4xl font-bold text-center dark:text-slate-100 my-12">There’s no recipe requests</h2>
                </div>
              )}
              <button type="button" onClick={handleEdit} className="my-8 py-3 bg-indigo-500 hover:bg-indigo-700 px-2 rounded-xl text-white font-bold">Add New Recipe</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default YourRecipes;
