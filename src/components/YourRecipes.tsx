import { useState, ChangeEvent, useEffect } from "react";

interface Recipe {
  name: string;
  time: string;
  description: string;
}

function YourRecipes() {
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [nuevoRecipe, setNuevoRecipe] = useState<Recipe>({ name: '', time: '', description: '' });

  const nuevoRecipeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoRecipe(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    function getLocal() {
      const storedRecipes = localStorage.getItem("yourRecipes");
      if (storedRecipes === undefined || storedRecipes === null) {
        setRecipes([]);
        return;
      }
      setRecipes(JSON.parse(storedRecipes));
    }
    getLocal();
  }, []);

  const handleAgregarRecipe = () => {
    if (nuevoRecipe.name && nuevoRecipe.time && nuevoRecipe.description) {
      const updatedRecipes = [...recipes, nuevoRecipe];
      setRecipes(updatedRecipes);
      localStorage.setItem("yourRecipes", JSON.stringify(updatedRecipes));
      setNuevoRecipe({ name: '', time: '', description: '' });
    }

    setIsEditting(false);
  };

  const handleEdit = () => {
    setIsEditting(true);
  };

  const handleViewRecipes = () => {
    setIsEditting(false);
  };

  return (
    <div className="Index">
      <div className="inner-container">
        <style>
          {`
            .recipe-box {
              border: 1px solid #ccc;
              border-radius: 8px;
              padding: 16px;
              margin: 16px 0;
              background-color: #f9f9f9;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
          `}
        </style>
        <div className="text-center">
          {!isEditting && (
            <h1 className="mt-8 font-bold text-6xl dark:text-slate-100">Your Recipes: (in revision)</h1>
          )}
          {isEditting ? (
            <div>
              <h2 className="dark:text-slate-100 text-6xl font-bold py-8">Add New Recipe</h2>
              <form className="text-lg text-justify px-16 py-8 dark:text-slate-100">
                <label>
                  Name:
                  <input type="text" name="name" value={nuevoRecipe.name} onChange={nuevoRecipeChange} />
                </label>
                <br />
                <label>
                  Time:
                  <input type="text" name="time" value={nuevoRecipe.time} onChange={nuevoRecipeChange} />
                </label>
                <br />
                <label>
                  Description:
                  <input type="text" name="description" value={nuevoRecipe.description} onChange={nuevoRecipeChange} />
                </label>
                <br />
                <button type="button" onClick={handleAgregarRecipe}>Add Recipe</button>
              </form>
              <button type="button" onClick={handleViewRecipes}>View Recipes</button>
            </div>
          ) : (
            <div>
              <ul>
                {recipes && recipes.map((recipe, index) => (
                  <li key={index} className="recipe-box">
                    <h2>{recipe.name}</h2>
                    <p>{recipe.time}</p>
                    <p>{recipe.description}</p>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={handleEdit}>Add New Recipe</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default YourRecipes;
