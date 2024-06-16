import React, { useState, createContext, useEffect, ReactNode } from "react";

export interface DarkModeContextType {
    darkMode: boolean;
    toggleDarkMode: (darkMode: boolean) => void;
}

export const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

interface DarkModeProviderProps {
    children: ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("darkMode") === "true") {
            setDarkMode(true);
            return;
        }
        setDarkMode(false);
    }, []);

    const toggleDarkMode = (darkMode: boolean) => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
        setDarkMode(darkMode);
    };

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};
