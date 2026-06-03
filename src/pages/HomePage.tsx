import { SiteHeader } from '../components/SiteHeader';
import { ServiceSection } from '../components/ServiceSection';
import { PageMeta } from '../components/PageMeta';
import { services } from '../data/services';

export function HomePage() {
  return (
    <>
      <PageMeta
        title="Shootin' Shots"
        description="Discover stunning photography and videography services in Parker County Texas. Capture your special moments with a professional and creative approach."
        keywords="photography, videography, Cassidy Sophier, Shootin' Shots, local photographer, Parker County Texas"
        ogTitle="Shootin' Shots Photography"
        ogDescription="Professional photography and videography in Parker County, Texas."
      />
      <SiteHeader className="home-header">
        <p className="home-subtitle font-display">by Cassidy Sophier</p>
        <section className="home-intro">
          <h1 className="display-title">Welcome to Shootin&apos; Shots Photography!</h1>
          <h2>Capturing Life&apos;s Special Moments with Passion and Creativity</h2>
        </section>
      </SiteHeader>
      <main>
        {services.map((service) => (
          <ServiceSection key={service.id} service={service} />
        ))}
      </main>
    </>
  );
}
