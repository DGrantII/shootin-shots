import { Helmet } from 'react-helmet-async';

interface PageMetaProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
}

export function PageMeta({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
}: PageMetaProps) {
  const fullTitle = title === "Shootin' Shots" ? title : `${title} | Shootin' Shots`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={ogTitle ?? fullTitle} />
      <meta property="og:description" content={ogDescription ?? description} />
      <meta
        property="og:image"
        content={`${import.meta.env.BASE_URL}images/shootin-shots-logo.png`}
      />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}
