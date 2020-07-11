export class SSRError extends Error {
  public statusCode: number;
  public shouldRedirect: boolean;
  constructor(config: Partial<SSRError> & {message: string}) {
    super(config.message);
    Object.assign(this, config);
  }
}
