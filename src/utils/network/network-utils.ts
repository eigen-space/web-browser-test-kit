import { AnyDictionary } from '@eigenspace/common-types';
import { MockHttpRequestHeaders } from '../..';
import * as puppeteer from 'puppeteer-core';

export class NetworkUtils {

    static getRequestBody<T = AnyDictionary>(
        requests: puppeteer.Request[],
        url: string,
        method: string,
        order?: number
    ): T | undefined {
        const filteredRequests = NetworkUtils.getRequestList(requests, url, method);

        const orderNumber = !order ? filteredRequests.length - 1 : order;
        return filteredRequests[orderNumber] && NetworkUtils.getBody(filteredRequests[orderNumber]);
    }

    static getRequestList(requests: puppeteer.Request[], url: string, method: string): puppeteer.Request[] {
        return requests.filter(
            request => {
                const headers = request.headers() as unknown as MockHttpRequestHeaders;
                const isMockMethodEqual = headers && headers['x-mock-method'] === method;
                const isMethodEqual = request.method() === method;
                const isUrlEqual = request.url() === url;

                return isUrlEqual && (isMockMethodEqual || isMethodEqual);
            }
        );
    }

    static getBody<T = AnyDictionary>(request: puppeteer.Request): T {
        const headers = request.headers() as unknown as MockHttpRequestHeaders;
        if (headers && headers['x-mock-body']) {
            return JSON.parse(headers['x-mock-body']);
        }

        const body = request.postData();
        return body && JSON.parse(body);
    }
}
