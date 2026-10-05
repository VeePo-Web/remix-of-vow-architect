import { Link, NavLink } from "react-router-dom";

export function PublicHeader() {
  return (
    <header className="public-header">
      <Link to="/" className="public-wordmark" aria-label="Gawryletz Music Services home">
        Gawryletz Music Services
      </Link>
      <nav aria-label="Primary navigation" className="public-nav">
        <NavLink to="/" end>Contact</NavLink>
        <NavLink to="/gallery">Gallery</NavLink>
      </nav>
    </header>
  );
}