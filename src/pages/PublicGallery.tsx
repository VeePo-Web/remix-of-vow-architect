import { useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PublicHeader } from "@/components/public/PublicHeader";
import { publicGallery } from "@/data/publicGallery";

export default function PublicGallery() {
  useEffect(() => {
    document.title = "Gallery | Gawryletz Music Services";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "A photography-led collection of weddings, live events, piano teaching and performance details from Gawryletz Music Services.");
  }, []);

  return (
    <div className="public-site public-gallery-page">
      <PublicHeader />
      <main id="main-content">
        <header className="public-gallery-intro">
          <p className="public-kicker">Selected photographs · 01—{String(publicGallery.length).padStart(2, "0")}</p>
          <h1>The work,<br /><em>as it happened.</em></h1>
          <div>
            <p>Weddings, rooms, rehearsals, lessons, and the quiet preparation before a first note.</p>
            <Link to="/">Start a conversation <ArrowRight aria-hidden="true" /></Link>
          </div>
        </header>

        <ol className="public-gallery-wall" aria-label="Gawryletz Music Services photography gallery">
          {publicGallery.map((image, index) => (
            <li key={image.src} className="public-gallery-item">
              <figure
                className={image.displayAspect ? "has-crop" : undefined}
                style={image.displayAspect ? { aspectRatio: image.displayAspect } : undefined}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading={index < 4 ? "eager" : "lazy"}
                  fetchPriority={index < 2 ? "high" : "auto"}
                  style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
                />
                <figcaption><span>{image.category}</span><span>{String(index + 1).padStart(2, "0")}</span></figcaption>
              </figure>
            </li>
          ))}
        </ol>

        <section className="public-gallery-close" aria-labelledby="gallery-close-title">
          <p className="public-kicker">Your moment</p>
          <h2 id="gallery-close-title">Let’s make something<br />worth remembering.</h2>
          <Link to="/"><ArrowLeft aria-hidden="true" /> Begin a conversation</Link>
        </section>
      </main>
    </div>
  );
}