import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About Me', end: false },
  { to: '/gallery', label: 'Gallery', end: false },
] as const;

export function SiteNav() {
  const [show, setShow] = useState(false);

  const close = () => setShow(false);

  return (
    <>
      <nav className="site-nav" aria-label="Site navigation">
        <button
          type="button"
          className="menu-toggle"
          aria-controls="site-offcanvas"
          aria-expanded={show}
          aria-label={show ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setShow(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <Offcanvas
        id="site-offcanvas"
        className="site-offcanvas"
        show={show}
        onHide={close}
        placement="start"
        scroll
      >
        <Offcanvas.Body>
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `site-offcanvas-link${isActive ? ' active' : ''}`
              }
              onClick={close}
            >
              {label}
            </NavLink>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
