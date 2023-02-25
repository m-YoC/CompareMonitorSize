// or_asymmetric.d.ts
import { MatcherFunction } from 'expect'

declare global {
  namespace jest {
    interface Expect {
      or<T extends unknown>(expected: T[]): T[]
    }
    interface ExpectExtendMap {
      or: MatcherFunction<[expected: unknown]>
    }
    interface InverseAsymmetricMatchers {
      or<T extends unknown>(expected: T[]): T[]
    }
  }
}