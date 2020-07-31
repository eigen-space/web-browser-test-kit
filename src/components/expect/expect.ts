import * as expect from 'expect';
import { toBeRequestWithValidBody } from './to-be-request-with-body/to-be-request-with-valid-body';
import { MatcherState } from '../../types/matcher-state';

interface Matchers<R> {
    toBeRequestWithValidBody(): R;
}

interface Expect {
    <T = unknown>(actual: T): Matchers<T>;
    setState(value: MatcherState): void;
}

expect.extend({ toBeRequestWithValidBody });

const expectWithUpdatedType = expect as unknown as Expect;

export { expectWithUpdatedType as expect };
