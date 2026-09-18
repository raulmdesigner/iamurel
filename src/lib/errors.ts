export function errorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message :
    typeof error === 'object' && error !== null && 'message' in error ? String(error.message) : 'Falha inesperada.';
  return message;
}

export async function withTimeout<T>(operation: PromiseLike<T>, milliseconds = 15000): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  try {
    return await Promise.race([
      Promise.resolve(operation),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error('A conexão demorou demais. Verifique sua internet e tente novamente.')), milliseconds);
      }),
    ]);
  } finally {
    clearTimeout(timer!);
  }
}
