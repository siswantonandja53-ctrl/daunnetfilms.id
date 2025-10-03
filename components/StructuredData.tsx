interface StructuredDataProps {
  type: 'WebSite' | 'Organization' | 'Course' | 'VideoObject' | 'BreadcrumbList';
  data: Record<string, unknown>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
}