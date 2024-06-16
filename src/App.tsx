
function App() {
  return (
    <>
      <div className="pt-16">
        <h1 className="text-center text-7xl font-bold">Activity from Movile Applications</h1>
      </div>
      <div className="overflow-hidden bg-white py-12 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-indigo-600">React + TypeScript</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Recipes Web App</p>
                <p className="mt-6 text-lg leading-8 text-gray-600">App that fetches data from an API and show data in list.</p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                  <div className="relative pl-9">
                    <dd className="inline">Meals section give a list of all the categories of meals availables.</dd>
                  </div>
                  <div className="relative pl-9">
                    <dd className="inline">You can watch a list of meals for category, click on and watch more details about that recipe.</dd>
                  </div>
                  <div className="relative pl-9">
                    <dd className="inline">You can save recipes and watch them in Favorites section.</dd>
                  </div>
                </dl>
              </div>
            </div>
            <img src="./main.png" alt="Example screenshot" className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
