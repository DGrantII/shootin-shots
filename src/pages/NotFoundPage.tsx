import { Link } from 'react-router-dom';
import { SiteHeader } from '../components/SiteHeader';
import { PageMeta } from '../components/PageMeta';

export function NotFoundPage() {
  return (
    <>
      <PageMeta
        title="Not Found"
        description="The page you requested could not be found. Return to Shootin' Shots Photography."
        keywords="photography, videography, Cassidy Sophier, Shootin' Shots"
      />
      <SiteHeader />
      <main className="not-found-page">
        <h1>Oops... The page you are looking for does not exist.</h1>
        <div className="cta-group">
          <Link className="cta-button" to="/">
            Back to Home
          </Link>
          <Link className="cta-button" to="/gallery">
            View Gallery
          </Link>
        </div>
      </main>
    </>
  );
}
