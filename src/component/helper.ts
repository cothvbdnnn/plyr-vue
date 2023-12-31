export function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

export function isObject(value: any): boolean {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function tryOnUnmounted(callback: () => void): () => void {
  if (!isFunction(callback)) {
    throw new Error('Invalid argument. Expected a function.');
  }

  let isUnmounted = false;

  function unmountHandler(): void {
    if (isUnmounted) {
      return;
    }

    isUnmounted = true;

    callback();
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', unmountHandler);
  }

  return function cleanup(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('beforeunload', unmountHandler);
    }
  };
}

