import { compareSync, hashSync } from "bcrypt";

export class HashUtils {
  hash(value: string) {
    return hashSync(value, 10);
  }

  compare(value: string, hashedValue: string) {
    return compareSync(value, hashedValue);
  }
}
