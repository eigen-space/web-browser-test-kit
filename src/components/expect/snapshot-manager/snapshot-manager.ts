import { AnyDictionary } from '@eigenspace/common-types';
import * as fs from 'fs';

export class SnapshotManager {
    private readonly baseDirPathName: string;

    constructor(basePath: string) {
        this.baseDirPathName = `${basePath}/__request_snapshots__`;
    }

    generateNewSnapshot(name: string, data: AnyDictionary): void {
        if (!fs.existsSync(this.baseDirPathName)) {
            fs.mkdirSync(this.baseDirPathName);
        }

        fs.writeFileSync(`${this.baseDirPathName}/${name}`, this.toFormattedJson(data));
    }

    isSnapshotExist(name: string): boolean {
        return fs.existsSync(`${this.baseDirPathName}/${name}`);
    }

    getSnapshotContent(name: string): AnyDictionary {
        const fileContent = fs.readFileSync(`${this.baseDirPathName}/${name}`, 'utf8');
        return JSON.parse(fileContent);
    }

    // noinspection JSMethodCanBeStatic
    private toFormattedJson(data: AnyDictionary): string {
        return JSON.stringify(data, undefined, 4);
    }
}
