import { useState, useEffect } from "react";
import { fetchCryptoPair } from "../helpers/api/cryptoApi";

const useCryptoPairs = () => {
  const [query, setQuery] = useState("");
  const [cryptoPairs, setCryptoPairs] = useState<string[]>([]);
  const [filteredPairs, setFilteredPairs] = useState<string[]>([]);
  const [viewFavorites, setViewFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    fetchCryptoPair()
      .then((data: string[]) => {
        setCryptoPairs(data);
        setFilteredPairs(data.slice(0, 1000));
      })
      .catch((error: Error) => {
        console.error(error.message);
      });
  }, []);

  const handleInputChange = (value: string, favorites: string[]) => {
    setQuery(value);
    const pairsToFilter = viewFavorites ? favorites : cryptoPairs;
    const filtered = value
      ? pairsToFilter.filter((pair) =>
          pair.toLowerCase().includes(value.toLowerCase())
        )
      : pairsToFilter;
    setFilteredPairs(filtered.slice(0, 1000));
  };

  const handleViewChange = (view: string, favorites: string[]) => {
    setViewFavorites(view === "favorites");
    setFilteredPairs(view === "favorites" ? favorites : cryptoPairs);
  };

  const toggleFavorite = (pair: string) => {
    setFavorites((prevFavorites) => {
      const existingIndex = prevFavorites.indexOf(pair);

      if (existingIndex === -1) {
        return [...prevFavorites, pair];
      } else {
        const updatedFavorites = [...prevFavorites];
        updatedFavorites.splice(existingIndex, 1);
        return updatedFavorites;
      }
    });
  };

  const clearSearch = () => {
    setQuery("");
    setFilteredPairs(viewFavorites ? favorites : cryptoPairs);
  };

  return {
    query,
    filteredPairs,
    favorites,
    toggleFavorite,
    handleInputChange,
    handleViewChange,
    clearSearch,
  };
};

export default useCryptoPairs;
