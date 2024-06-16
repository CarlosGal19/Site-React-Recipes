import React, { useState, createContext, ReactNode, useEffect } from "react";

// Define the Item interface
export interface Item {
  id: number;
  name: string;
  url: string;
}

// Define the type for the context value
export interface FavoriteContextType {
  favorite: Item[];
  addFavorite: (item: Item) => void;
  removeFavorite: (idItem: number) => void;
  isFavorite: (idItem: number) => boolean;
}

// Create the context with a default value
export const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

// Define the props for the FavoriteProvider component
interface FavoriteProviderProps {
  children: ReactNode;
}

export const FavoriteProvider: React.FC<FavoriteProviderProps> = ({ children }) => {
  const [favorite, setFavorite] = useState<Item[]>([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorite(JSON.parse(storedFavorites));
    }
  }, []);

  const addFavorite = (item: Item) => {
    // Actualiza el estado usando el callback de setState
    setFavorite((prevFavorite) => {
      const updatedFavorite = [...prevFavorite, item];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorite));
      return updatedFavorite;
    });
  };

  const removeFavorite = (idItem: number) => {
    // Actualiza el estado usando el callback de setState
    setFavorite((prevFavorite) => {
      const updatedFavorite = prevFavorite.filter((i) => i.id !== idItem);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorite));
      return updatedFavorite;
    });
  };

  const isFavorite = (idItem: number) => {
    return favorite.some((i: Item) => i.id === idItem);
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorite,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
