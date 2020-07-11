export class SSRError extends Error {
  public statusCode: number;
  public shouldRedirect: boolean;
  public errorPayload: any;
  constructor(config: Partial<SSRError> & {message: string}) {
    super(config.message);
    Object.assign(this, config);
  }
}
