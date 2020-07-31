import { ObjectUtils } from './object.utils';

describe('ObjectUtils', () => {

    describe('#isDeepEqual', () => {

        it('should return true is objects are equal', () => {
            const objectA = {
                a: 1,
                innerB: { c: 2 }
            };
            const objectB = {
                a: 1,
                innerB: { c: 2 }
            };

            expect(ObjectUtils.isDeepEqual(objectA, objectB)).toBeTruthy();
        });

        it('should return false is objects are not equal by key', () => {
            const objectA = {
                a: 1,
                innerB: { g: 2 }
            };
            const objectB = {
                a: 1,
                innerB: { c: 2 }
            };

            expect(ObjectUtils.isDeepEqual(objectA, objectB)).toBeFalsy();
        });

        it('should return false is objects are not equal by value', () => {
            const objectA = {
                a: 1,
                innerB: { g: 2 }
            };
            const objectB = {
                a: 1,
                innerB: { g: 4 }
            };

            expect(ObjectUtils.isDeepEqual(objectA, objectB)).toBeFalsy();
        });
    });
});
