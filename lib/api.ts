import { configs } from './config';

type ApiFetchOptions<TBody> = Omit<RequestInit, 'body'> & {
  data?: TBody;
};

export async function apiFetch<TBody, TResponse = unknown>(
  path: string,
  options: ApiFetchOptions<TBody> = {}
): Promise<TResponse> {
  const { data, headers, cache, ...rest } = options;

  const res = await fetch(`${configs.backendBaseUrl}${path}`, {
    ...rest,
    cache: cache ?? 'default',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!res.ok) {
    const err = await res.json();
    console.log(err);
    throw new Error(err.message);
  }

  return res.json();
}
