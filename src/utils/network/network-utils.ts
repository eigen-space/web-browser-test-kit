import { AnyDictionary } from '@eigenspace/common-types';
import { InterceptedRequest } from 'wdio-intercept-service';
import { MockHttpRequestHeaders } from '../..';

export class NetworkUtils {

    static getRequestBody<T = AnyDictionary>(
        requests: InterceptedRequest[],
        url: string,
        method: string,
        order?: number
    ): T | undefined {
        const filteredRequests = NetworkUtils.getRequestList(requests, url, method);

        const orderNumber = !order ? filteredRequests.length - 1 : order;
        return filteredRequests[orderNumber] && NetworkUtils.getBody(filteredRequests[orderNumber]);
    }

    static getRequestList(requests: InterceptedRequest[], url: string, method: string): InterceptedRequest[] {
        return requests.filter(
            request => {
                const headers = request.headers as MockHttpRequestHeaders;
                const isMockMethodEqual = headers && headers['x-mock-method'] === method;
                const isMethodEqual = request.method === method;
                const isUrlEqual = request.url === url;

                return isUrlEqual && (isMockMethodEqual || isMethodEqual);
            }
        );
    }

    static getBody<T = AnyDictionary>(request: InterceptedRequest): T {
        const headers = request.headers as MockHttpRequestHeaders;
        if (headers && headers['x-mock-body']) {
            return JSON.parse(headers['x-mock-body']);
        }

        return request.body && typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
    }
}
