export abstract class BaseEntity<T> {
  constructor(protected id: T) {
    //
  }

  isSpecified(): boolean {
    return true;
  }
}
