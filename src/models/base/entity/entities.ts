import { BaseEntity } from './entity';

export abstract class BaseEntities<T extends BaseEntity<any>> {
  constructor(protected list: T[]) {
    //
  }

  get count(): number {
    return this.list.length;
  }

  exists(): boolean {
    return 0 < this.count;
  }

  toArray(): T[] {
    return this.list;
  }
}
