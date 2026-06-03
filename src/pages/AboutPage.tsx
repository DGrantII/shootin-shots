import { SiteHeader } from '../components/SiteHeader';
import { ResponsivePicture } from '../components/ResponsivePicture';
import { PageMeta } from '../components/PageMeta';
import { getManifestEntry } from '../data/manifest';

export function AboutPage() {
  const profile = getManifestEntry('profile');

  return (
    <>
      <PageMeta
        title="About Me"
        description="Learn more about Cassidy Sophier, a passionate photographer and videographer based in Parker County Texas."
        keywords="photography, videography, Cassidy Sophier, Shootin' Shots, photographer bio, local artist"
      />
      <SiteHeader />
      <main>
        <div className="about-layout">
          <aside className="about-aside">
            <ResponsivePicture
              entry={profile}
              alt="Cassidy Sophier, photographer"
            />
          </aside>
          <section className="about-content">
            <div className="description-card about-description-card">
              <h1 className="display-title">Cassidy Sophier, Behind the Camera</h1>
              <p>Howdy!</p>
              <p>
                My name is Cassidy Sophier, and I am a local photographer and videographer based in
                Parker County, Texas. I specialize in capturing life&apos;s special moments, from
                graduations and birthdays to weddings and family portraits. With a keen eye for detail
                and a passion for storytelling, I strive to create images and videos that truly reflect
                the essence of each occasion.
              </p>
              <p>
                Whether you&apos;re looking for professional photos for your business or candid shots
                of your loved ones, I&apos;m here to help you preserve those memories. Let&apos;s work
                together to create something beautiful!
              </p>
              <h3>Contact Me:</h3>
              <p>
                <a
                  className="about-email"
                  href="mailto:baby8sophier@outlook.com?subject=Shootin'%20Shots%20Photography"
                >
                  baby8sophier@outlook.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
