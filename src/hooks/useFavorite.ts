import { useContext } from 'react';
import { FavoriteContext } from '../context/FavoriteProvider';

const useFavorite = () => {
    const context = useContext(FavoriteContext);

    if (!context) {
        throw new Error('useFavorite must be used within a FavoriteProvider');
    }

    return context;
};

export default useFavorite;
