import React, { useState, useEffect, useRef } from "react";
import { List, AutoSizer, ListRowProps } from "react-virtualized";
import "react-virtualized/styles.css";
import "./Search.css";
import useCryptoPairs from "../../hooks/useCryptoPairs";
import { ReactComponent as SearchIcon } from "../../icons/search-icon.svg";
import { ReactComponent as CloseBtnIcon } from "../../icons/close-icon.svg";
import { ReactComponent as FavoriteEmptyIcon } from "../../icons/star-empty.svg";
import { ReactComponent as FavoriteFullIcon } from "../../icons/star-full.svg";

const Search: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeView, setActiveView] = useState<"all" | "favorites">("all");
  const [theme, setTheme] = useState<"light" | "dark">("dark"); // Default theme
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const {
    query,
    filteredPairs,
    favorites,
    toggleFavorite,
    handleInputChange,
    handleViewChange,
    clearSearch,
  } = useCryptoPairs();

  const handleButtonClick = () => {
    setShowDropdown((prev) => !prev);
    clearSearch();
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event.target.value, favorites);
  };

  const handleFavoriteClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    pair: string
  ) => {
    e.stopPropagation();
    toggleFavorite(pair);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      !searchBtnRef.current?.contains(event.target as Node)
    ) {
      setShowDropdown(false);
      clearSearch();
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    document.body.className = theme;

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDropdown, theme]);

  const rowRenderer = ({ index, key, style }: ListRowProps) => {
    const pair = filteredPairs[index];
    return (
      <div className="list-item" key={key} style={style}>
        <>
          <button
            className="favBtn"
            onClick={(e) => handleFavoriteClick(e, pair)}
          >
            {favorites.includes(pair) ? (
              <FavoriteFullIcon />
            ) : (
              <FavoriteEmptyIcon />
            )}
          </button>
          {pair}
        </>
      </div>
    );
  };

  const handleViewClick = (view: "all" | "favorites") => {
    handleViewChange(view, favorites);
    setActiveView(view);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="search-container">
      <button
        className={`button ${showDropdown && "onFocus"}`}
        onClick={handleButtonClick}
        ref={searchBtnRef}
      >
        <SearchIcon className="search-icon" />
        Search
      </button>
      <button onClick={toggleTheme} className="button">
        {theme}
      </button>
      {showDropdown && (
        <div className="dropdown" ref={dropdownRef}>
          <div>
            <div className="search-container__input">
              <input
                className="search-input"
                id="search-input"
                type="text"
                value={query}
                onChange={handleInput}
                placeholder="Search..."
              />
              <label className="search-input__icon" htmlFor="search-input">
                <SearchIcon className="search-icon" />
              </label>

              <button className="close-btn" onClick={clearSearch}>
                <CloseBtnIcon />
              </button>
            </div>

            <div className="btn-container">
              <button
                className={`button ${activeView === "favorites" && "disabled"}`}
                onClick={() => handleViewClick("favorites")}
                disabled={activeView === "favorites"}
              >
                <FavoriteFullIcon className="favorite-icon" />
                FAVORITES
              </button>
              <button
                className={`button ${activeView === "all" && "disabled"}`}
                onClick={() => handleViewClick("all")}
                disabled={activeView === "all"}
              >
                ALL COINS
              </button>
            </div>
          </div>

          {filteredPairs.length > 0 ? (
            <AutoSizer disableHeight>
              {({ width }) => (
                <List
                  width={width}
                  height={200}
                  rowCount={filteredPairs.length}
                  rowHeight={40}
                  rowRenderer={rowRenderer}
                  overscanRowCount={5}
                />
              )}
            </AutoSizer>
          ) : (
            <div style={{ padding: "10px" }}>No matches found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
