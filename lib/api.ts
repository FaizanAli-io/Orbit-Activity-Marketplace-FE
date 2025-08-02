import { configs } from './config';

type ApiFetchOptions<TBody> = Omit<RequestInit, 'body'> & {
  data?: TBody;
};

export async function apiFetch<TBody, TResponse = unknown>(
  path: string,
  options: ApiFetchOptions<TBody> = {}
): Promise<TResponse> {
  const { data, headers, ...rest } = options;

  const res = await fetch(`${configs.backendBaseUrl}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!res.ok) {
    // console.log(res);
    const err = await res.json();
    throw new Error(err.message);
  }

  return res.json();
}
