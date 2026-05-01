export const emit = (event: string, data?: any) => {
  window.dispatchEvent(new CustomEvent(event, { detail: data }));
};

export const listen = (event: string, callback: (data: any) => void) => {
  const handler = (e: Event) => {
    callback((e as CustomEvent).detail);
  };

  window.addEventListener(event, handler);

  return () => window.removeEventListener(event, handler);
};