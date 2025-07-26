const BASE_URL = process.env.BE_BASE_URL || 'http://localhost:3000';

type ApiFetchOptions<TBody> = Omit<RequestInit, 'body'> & {
  data?: TBody;
};

export async function apiFetch<TBody = any, TResponse = unknown>(
  path: string,
  options: ApiFetchOptions<TBody> = {}
): Promise<TResponse> {
  const { data, headers, ...rest } = options;
  console.log(`${BASE_URL}${path}`);

  const res = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  return res.json();
}
