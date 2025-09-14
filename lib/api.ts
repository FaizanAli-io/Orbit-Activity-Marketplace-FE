import { configs } from './config';

type ApiFetchOptions<TBody> = Omit<RequestInit, 'body'> & {
  data?: TBody;
};

export async function apiFetch<TBody, TResponse = unknown>(
  path: string,
  options: ApiFetchOptions<TBody> = {}
): Promise<TResponse> {
  const { data, headers, cache, ...rest } = options;

  // Log request with detailed information
  const url = `${configs.backendBaseUrl}${path}`;

  const method = rest.method || 'GET';
  // ! DEBUGGING PURPOSES ONLY

  // const requestHeaders = {
  //   'Content-Type': 'application/json',
  //   ...headers,
  // };

  // const startTime = Date.now();
  //  console.log(`[API] ${method} ${url}`, {
  //   headers: requestHeaders,
  //   cache: cache ?? 'default',
  //   body: data,
  //   ...rest,
  // });

  const res = await fetch(url, {
    ...rest,
    cache: cache ?? 'default',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...(method !== 'GET' &&
      method !== 'HEAD' && {
        body: data ? JSON.stringify(data) : JSON.stringify({}),
      }),
  });

  // ! DEBUGGING PURPOSES ONLY
  // // Log response
  // const duration = Date.now() - startTime;
  // console.log(
  //   `[API] ${method} ${url} - ${res.status} ${res.statusText} (${duration}ms)`
  // );

  if (!res.ok) {
    const err = await res.json();
    console.log(`[API ERROR]`, err);
    throw new Error(err.message);
  }

  return res.json();
}
