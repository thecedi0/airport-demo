export function Controller(config: any) {
  return function (target: any) {
    Object.defineProperty(
      target.prototype,
      '__controller',
      { value: () => config })
  }
}
export function second() {
  console.log("second(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("second(): called");
  };
}
