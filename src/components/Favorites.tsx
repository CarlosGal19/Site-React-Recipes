import useFavorite from "../hooks/useFavorite";

const Favorites = () => {
  const { favorite, removeFavorite } = useFavorite();

  return (
    <>
      <h1 className='text-6xl font-bold text-center py-8 bg-gray-300'>Favorites</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-300'>
        {/* Conditional rendering based on whether there are favorites */}
        {favorite.length === 0 ? (
          <div className='col-span-2 md:col-span-3 text-center'>
            <p className='text-4xl py-36'>No favorites yet</p>
          </div>
        ) : (
          favorite.map((item) => (
            <div key={item.id} className='shadow-md rounded p-4 text-center bg-indigo-200'>
              <h2 className='font-bold text-3xl'>{item.name}</h2>
              <img src={item.url} alt={item.name} className='object-cover mt-4 rounded-full mx-auto w-1/2' />
              <a href={`/recipe?id=${item.id}`}><button className="px-8 bg-indigo-500 hover:bg-indigo-700 rounded text-white font-bold py-2 x-4 m-4">Show Recipe</button></a>
              <button
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4'
                onClick={() => {
                  removeFavorite(item.id);
                }}>
                Remove from Favorites
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Favorites;
