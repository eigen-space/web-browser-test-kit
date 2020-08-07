import * as expect from 'expect';
import { toBeRequestWithValidBody } from './to-be-request-with-body/to-be-request-with-valid-body';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

interface Matchers<R> {
    toBeRequestWithValidBody(): R;
    toMatchImageSnapshot(): ReturnType<typeof toMatchImageSnapshot>
}

interface Expect {
    <T = unknown>(actual: T): Matchers<T>;
}

expect.extend({ toBeRequestWithValidBody, toMatchImageSnapshot });

const expectWithUpdatedType = expect as unknown as Expect;

export { expectWithUpdatedType as expect };
