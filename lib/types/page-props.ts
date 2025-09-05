// Common types for Next.js 15+ page components

export interface PageProps {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface SimplePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Helper function to safely access search params
export async function getSearchParams(
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
) {
  try {
    return await searchParams;
  } catch (error) {
    console.error('Error accessing searchParams:', error);
    return {};
  }
}

// Helper to get a single string value from search params
export function getSearchParam(
  params: { [key: string]: string | string[] | undefined },
  key: string
): string | undefined {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

// Helper to create a cache key from search params (handles undefined values)
export function createSearchKey(...values: (string | undefined)[]): string {
  return values.map(val => val || '').join('-');
}
