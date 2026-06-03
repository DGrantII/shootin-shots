import type { ReactNode } from 'react';
import { ResponsivePicture } from './ResponsivePicture';
import { getManifestEntry } from '../data/manifest';

interface SiteHeaderProps {
  children?: ReactNode;
  className?: string;
}

export function SiteHeader({ children, className = '' }: SiteHeaderProps) {
  const logo = getManifestEntry('shootin-shots-logo');

  return (
    <header className={`site-header ${className}`.trim()}>
      <ResponsivePicture entry={logo} alt="Shootin' Shots Photography" loading="eager" />
      {children}
    </header>
  );
}
