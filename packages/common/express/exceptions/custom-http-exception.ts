export class CustomHttpException extends Error {
  constructor(public message: string, public code: number) {
    super();
  }
}
