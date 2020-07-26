import { AnyDictionary } from '@eigenspace/common-types';
import { InterceptedRequest } from 'wdio-intercept-service';
import * as fs from 'fs';

export class SpecsUtils {

    static getJsonContent<T = AnyDictionary>(path: string): T {
        return JSON.parse(fs.readFileSync(path, 'utf8'));
    }

    static getRequestBody<T = AnyDictionary>(
        requests: InterceptedRequest[],
        url: string,
        method: string
    ): T | undefined {
        const request = SpecsUtils.getRequest(requests, url, method);
        return request && SpecsUtils.getBody(request);
    }

    static getRequest(requests: InterceptedRequest[], url: string, method: string): InterceptedRequest | undefined {
        return requests.find(
            request =>
                request.url === url
                && ((request.headers as AnyDictionary)['x-mock-method'] === method || request.method === method)
        );
    }

    static getBody<T = AnyDictionary>(request: InterceptedRequest): T {
        const body: T = request.body && typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
        const headers: AnyDictionary = request.headers;
        const mockBody: T = headers['x-mock-body'] && JSON.parse(headers['x-mock-body']);

        return mockBody || body;
    }
}
