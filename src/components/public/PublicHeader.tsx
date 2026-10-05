import { Link, NavLink } from "react-router-dom";

export function PublicHeader() {
  return (
    <header className="public-header">
      <Link to="/" className="public-wordmark" aria-label="Parker Gawryletz home">
        Parker Gawryletz
      </Link>
      <nav aria-label="Primary navigation" className="public-nav">
        <NavLink to="/" end>Contact</NavLink>
        <NavLink to="/gallery">Gallery</NavLink>
      </nav>
    </header>
  );
}