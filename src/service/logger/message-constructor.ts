export function messageConstructor(reqId: string, message: string): string {
  return JSON.stringify({"req-id": reqId, message}, undefined, 2);
}
