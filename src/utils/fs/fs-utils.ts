import { AnyDictionary } from '@eigenspace/common-types';
import * as fs from 'fs';

export class FsUtils {

    static getJsonContent<T = AnyDictionary>(path: string): T {
        return JSON.parse(fs.readFileSync(path, 'utf8'));
    }
}
