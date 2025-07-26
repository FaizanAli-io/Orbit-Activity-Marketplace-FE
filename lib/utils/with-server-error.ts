export async function withServerError<T>(fn: () => Promise<T>) {
  try {
    const data = await fn();
    return { success: true, data } as const;
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.message
        : typeof err === 'string'
        ? err
        : 'Something went wrong';

    return {
      success: false,
      error: message,
    } as const;
  }
}
