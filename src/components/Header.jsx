import * as React from 'react';
import './Header.css'

export default function Header({handleSearch, search, setSearch}) {
  return (
    <header className="header">
      <div className="header-container">
          <div className="logo">
            <h1 className="logo-text">
              Valantis
            </h1>
          </div>
          <div className="search-container">
              <div className="search">
                  <input className="search-input" placeholder="Search..." type="search" value={search} onChange={(e) => setSearch(e.target.value)} />
                  <button className="search-button" onClick={handleSearch}>
                      Search
                  </button>
              </div>
          </div>
      </div>
    </header>
  );
}

