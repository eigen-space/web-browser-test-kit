import { AnyDictionary } from '@eigenspace/common-types';
import { ObjectUtils } from '../../../utils/object/object.utils';
import diff from 'jest-diff';
import { NetworkUtils } from '../../../utils/network/network-utils';
import { SnapshotManager } from '../snapshot-manager/snapshot-manager';
import { MatcherState } from '../../../types/matcher-state';
import * as puppeteer from 'puppeteer-core';

interface SyncExpectationResult {
    pass: boolean;
    message?: () => string | null;
}

export interface Received {
    requests: puppeteer.Request[],
    url: string;
    method: string;
    order?: number;
}

interface Context extends MatcherState {
}

export function toBeRequestWithValidBody(this: Context, received: Received): SyncExpectationResult {
    const testDir = this.testPath.split('/')
        .slice(0, -1)
        .join('/');
    const snapshotManager = new SnapshotManager(testDir);

    const requestBody = NetworkUtils.getRequestBody(
        received.requests,
        received.url,
        received.method,
        received.order
    );

    if (!requestBody) {
        return {
            message: () => 'There are no any requests like this 🤷‍️',
            pass: false
        };
    }

    const formattedUrl = received.url.replace(/http(s?):\/\/([a-z,0-9.:]*)\//, '')
        .split('/')
        .join('-')
        .replace('.json', '');

    const name = `${received.method.toLowerCase()}-${formattedUrl}-${received.order || 0}.json`;

    let content: AnyDictionary;
    if (snapshotManager.isSnapshotExist(name)) {
        content = snapshotManager.getSnapshotContent(name);
    } else {
        snapshotManager.generateNewSnapshot(name, requestBody);
        content = requestBody;
    }

    if (ObjectUtils.isDeepEqual(requestBody, content)) {
        return { pass: true };
    }

    return {
        message: () => diff(requestBody, content, { expand: false }),
        pass: false
    };
}
