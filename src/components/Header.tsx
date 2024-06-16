import React, { useEffect } from "react";
import useDarkMode from "../hooks/useDarkMode";

const Header: React.FC = () => {
    const { toggleDarkMode, darkMode } = useDarkMode();

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        toggleDarkMode(isChecked);
    };

    return (
        <nav
            className="relative flex w-full flex-nowrap items-center justify-between bg-sky-300 py-2 text-neutral-500 shadow-dark-mild hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-700 lg:flex-wrap lg:justify-start lg:py-4"
            data-twe-navbar-ref>
            <div className="flex w-full flex-wrap items-center justify-between px-3">
                <div className="ms-2">
                    <a className="text-xl text-black dark:text-white" href="/">Home</a>
                </div>
                <button
                    className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
                    type="button"
                    data-twe-collapse-init
                    data-twe-target="#navbarSupportedContent2"
                    aria-controls="navbarSupportedContent2"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span
                        className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                                clipRule="evenodd" />
                        </svg>
                    </span>
                </button>
                <div
                    className="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
                    id="navbarSupportedContent2"
                    data-twe-collapse-item>
                    <ul
                        className="list-style-none me-auto flex flex-col ps-0 lg:mt-1 lg:flex-row"
                        data-twe-navbar-nav-ref>
                        <li
                            className="my-4 ps-2 lg:my-0 lg:pe-1 lg:ps-2"
                            data-twe-nav-item-ref>
                            <a
                                className="text-black dark:text-white lg:px-2"
                                aria-current="page"
                                href="/meals"
                                data-twe-nav-link-ref
                            >Meals</a>
                        </li>
                        <li
                            className="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0"
                            data-twe-nav-item-ref>
                            <a
                                className="p-0 text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                                href="/favorites"
                                data-twe-nav-link-ref
                            >Favorites</a>
                        </li>
                        <li>
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    onChange={handleChange}
                                    checked={darkMode}
                                    className="sr-only peer"
                                />
                                <div className="relative w-11 h-6 bg-gray-800 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-sky-500"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Dark Mode</span>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
