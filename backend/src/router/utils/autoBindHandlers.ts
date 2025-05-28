// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const autoBindhandlers = (instance: any): void => {
  const prototype = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(prototype)
    .filter((prop) => typeof instance[prop] === "function")
    .forEach((method) => {
      instance[method] = instance[method].bind(instance);
    });
}