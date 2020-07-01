export class Timer {
  private startTime: Date;
  private endTime: Date;

  public start(): void {
    this.startTime = new Date();
  }

  public end(): void {
    this.endTime = new Date();
  }

  public getDuration(): number {
    return this.endTime.getTime() - this.startTime.getTime();
  }
}
