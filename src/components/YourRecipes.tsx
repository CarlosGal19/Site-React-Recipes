import { useState, ChangeEvent, useEffect } from "react";

interface Recipe {
  name: string;
  time: string;
  description: string;
}

function YourRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([] as Recipe[]);
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
        return
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
  };

  return (
    <div className="inner-container">
      <div className="text-center">
        <h1 className="mt-8 font-bold text-6xl dark:text-slate-100">Your Recipes: (in revision)</h1>
        <ul>
          {
            recipes &&
            recipes.map((recipe, index) => (
              <li key={index}>
                <h2>{recipe.name}</h2>
                <p>{recipe.time}</p>
                <p>{recipe.description}</p>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="text-center">
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
      </div>
    </div>
  );
}

export default YourRecipes;


