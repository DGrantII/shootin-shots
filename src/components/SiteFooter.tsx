export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p>Shootin&apos; Shots Photography &mdash; Cassidy Sophier</p>
      <p>
        <a href="mailto:baby8sophier@outlook.com?subject=Shootin'%20Shots%20Photography">
          baby8sophier@outlook.com
        </a>
      </p>
      <p className="text-muted small">&copy; {year}</p>
    </footer>
  );
}
