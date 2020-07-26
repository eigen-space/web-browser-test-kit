import { SpecsUtils } from './specs-utils';
import { InterceptedRequest } from 'wdio-intercept-service';

describe('SpecUtils', () => {
    const response = { headers: {}, body: {}, statusCode: 200 };
    const requests: InterceptedRequest[] = [
        {
            url: 'http://localhost:3000/invoices/3f991e08-0959-44e0-99c2-efb0dd2fdc7a',
            method: 'GET',
            headers: { 'x-mock-method': 'POST' },
            body: { id: '109736051' },
            response
        },
        {
            url: 'http://localhost:3000/invoices/3f991e08-0959-44e0-99c2-foldosfdf',
            method: 'GET',
            headers: { 'x-mock-method': 'POST' },
            body: { id: '109736052' },
            response
        },
        {
            url: 'http://localhost:3000/invoices/3f991e08-0959-44e0-99c2-ujolololo',
            method: 'PUT',
            headers: {},
            body: { id: '228' },
            response
        },
        {
            url: 'http://localhost:3000/invoices/3f991e08-0959-44e0-99c2-44e0eadsv',
            method: 'POST',
            headers: {
                'x-mock-body': JSON.stringify({ id: '228' })
            },
            // Because of Intercepted Request type requirements
            body: undefined as unknown as string,
            response
        }
    ];

    describe('#getJsonContent', () => {

        it('should return content of json', () => {
            const content = SpecsUtils.getJsonContent(`${__dirname}/api-response.json`);
            expect(content).toEqual({ id: '123' });
        });
    });

    describe('#getRequestBody', () => {

        it('should find a valid mock POST-request', () => {
            const actual = SpecsUtils.getRequestBody(
                requests,
                'http://localhost:3000/invoices/3f991e08-0959-44e0-99c2-foldosfdf',
                'POST'
            );
            expect(actual?.id).toEqual('109736052');
        });

        it('should find a valid non-mock PUT-request', () => {
            const actual = SpecsUtils.getRequestBody(
                requests,
                'http://localhost:3000/invoices/3f991e08-0959-44e0-99c2-ujolololo',
                'PUT'
            );
            expect(actual?.id).toEqual('228');
        });

        it('should get body from non-mock POST-request', () => {
            const actual = SpecsUtils.getRequestBody(
                requests,
                'http://localhost:3000/invoices/3f991e08-0959-44e0-99c2-ujolololo',
                'PUT'
            );
            expect(actual?.id).toEqual('228');
        });

        it('should get body from mock POST-request', () => {
            const actual = SpecsUtils.getRequestBody(
                requests,
                'http://localhost:3000/invoices/3f991e08-0959-44e0-99c2-44e0eadsv',
                'POST'
            );
            expect(actual?.id).toEqual('228');
        });
    });
});
