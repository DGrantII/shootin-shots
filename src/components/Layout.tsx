import { Outlet } from 'react-router-dom';
import { ScrollToTop } from './ScrollToTop';
import { SiteNav } from './SiteNav';
import { SiteFooter } from './SiteFooter';

export function Layout() {
  return (
    <>
      <ScrollToTop />
      <SiteNav />
      <div className="content-card">
        <Outlet />
        <SiteFooter />
      </div>
    </>
  );
}
