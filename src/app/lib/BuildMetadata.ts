import { Metadata } from 'next';
import { meta } from '../config/meta.config';

type MetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: {
    src?: string;
    alt?: string;
  };
  titleAbsolute?: string;
};

export const buildMetadata = ({ 
  title, 
  description, 
  path, 
  image, 
  titleAbsolute 
}: MetadataOptions): Metadata => {
  const fullUrl = `${meta.url}${path}`;
  const ogImage = image?.src || `${meta.url}/meta/og-image.png`;

  return {
    title: titleAbsolute ? { absolute: titleAbsolute } : title,
    description,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      type: 'website',
      url: fullUrl,
      title,
      description,
      images: [
        {
          url: ogImage,
          alt: image?.alt || title,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
};

export const getLocalizedJsonLd = async () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${meta.url}/#website`,
      name: meta.title,
      url: meta.url,
      description: meta.description,
      image: `${meta.url}/meta/og-image.png`,
      potentialAction: [
        {
          '@type': 'ContactAction',
          target: `${meta.url}/#kontakt`,
          name: 'Kontaktirajte nas',
        },
        {
          '@type': 'ViewAction',
          target: `${meta.url}/#galerija`,
          name: 'Pogledajte galeriju',
        },
      ],
      inLanguage: 'hr-HR',
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${meta.url}/#organization`,
      name: meta.name,
      url: meta.url,
      logo: `${meta.url}/logo.svg`,
      email: meta.company.contact.email,
      telephone: meta.company.contact.phone,
      description: meta.description,
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: meta.company.address.street,
        addressLocality: meta.company.address.city,
        addressRegion: meta.company.address.region,
        postalCode: meta.company.address.postalCode,
        addressCountry: meta.company.address.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: meta.company.geo.latitude,
        longitude: meta.company.geo.longitude,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '16:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '09:00',
          closes: '13:00',
        },
      ],
      sameAs: [
        meta.company.social.facebook,
        meta.company.social.instagram,
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '150',
      },
      areaServed: [
        {
          '@type': 'City',
          name: 'Split',
        },
        {
          '@type': 'City',
          name: 'Kaštela',
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Dalmacija',
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'PVC Stolarija',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'PVC Prozori',
              description: 'Vrhunski PVC prozori s toplinskom i zvučnom izolacijom',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'PVC Vrata',
              description: 'Sigurna i moderna PVC ulazna vrata',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Balkonska Vrata',
              description: 'Elegantna PVC balkonska vrata',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Roletne',
              description: 'Kvalitetne roletne za dodatnu zaštitu',
            },
          },
        ],
      },
    },
  ],
});