import { InterceptedRequest } from 'wdio-intercept-service';
import { AnyDictionary } from '@eigenspace/common-types';
import { NetworkUtils } from './network-utils';

describe('NetworkUtils', () => {
    const response = { headers: {}, body: {}, statusCode: 200 };
    const requests = [
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
            method: 'GET',
            url: 'http://localhost:3000/invoices/1',
            body: { id: '1' }
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
        },
        {
            method: 'GET',
            url: 'http://localhost:3000/invoices/1',
            body: { id: '2' }
        }
    ] as InterceptedRequest[];

    describe('#getRequestBody', () => {

        it('should get specified request number', () => {
            const actual = NetworkUtils.getRequestBody(
                requests,
                'http://localhost:3000/invoices/1',
                'GET',
                1
            ) as AnyDictionary;
            expect(actual.id).toEqual('2');
        });

        it('should find a valid mock POST-request', () => {
            const actual = NetworkUtils.getRequestBody(
                requests,
                'http://localhost:3000/invoices/3f991e08-0959-44e0-99c2-foldosfdf',
                'POST'
            );
            expect(actual?.id).toEqual('109736052');
        });

        it('should find a valid non-mock PUT-request', () => {
            const actual = NetworkUtils.getRequestBody(
                requests,
                'http://localhost:3000/invoices/3f991e08-0959-44e0-99c2-ujolololo',
                'PUT'
            );
            expect(actual?.id).toEqual('228');
        });

        it('should get body from non-mock POST-request', () => {
            const actual = NetworkUtils.getRequestBody(
                requests,
                'http://localhost:3000/invoices/3f991e08-0959-44e0-99c2-ujolololo',
                'PUT'
            );
            expect(actual?.id).toEqual('228');
        });

        it('should get body from mock POST-request', () => {
            const actual = NetworkUtils.getRequestBody(
                requests,
                'http://localhost:3000/invoices/3f991e08-0959-44e0-99c2-44e0eadsv',
                'POST'
            );
            expect(actual?.id).toEqual('228');
        });
    });
});
