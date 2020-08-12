import { AnyDictionary } from '@eigenspace/common-types';

export class ObjectUtils {

    static isDeepEqual(obj1: AnyDictionary, obj2: AnyDictionary): boolean {
        if (obj1 === obj2) {
            return true;
        }

        if (!ObjectUtils.isObject(obj1) || !ObjectUtils.isObject(obj2)) {
            return false;
        }

        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
            return false;
        }

        for (const prop in obj1) {
            // noinspection JSUnfilteredForInLoop
            if (!ObjectUtils.isDeepEqual(obj1[prop], obj2[prop])) {
                return false;
            }
        }

        return true;
    }

    static isObject(obj: AnyDictionary): boolean {
        return Boolean(typeof obj === 'object' && obj != null);
    }
}
