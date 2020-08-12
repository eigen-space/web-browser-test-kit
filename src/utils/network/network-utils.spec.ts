import { AnyDictionary } from '@eigenspace/common-types';
import { NetworkUtils } from './network-utils';
import * as puppeteer from 'puppeteer';
import { Headers } from 'puppeteer';

describe('NetworkUtils', () => {
    const response = { headers: {}, body: {}, statusCode: 200 };
    const requests = [
        {
            url: () => 'http://localhost:3000/invoices/3f991e08-0959-44e0-99c2-efb0dd2fdc7a',
            method: () => 'GET',
            headers: () => ({ 'x-mock-method': 'POST' }) as Headers,
            postData: () => JSON.stringify({ id: '109736051' }),
            response
        },
        {
            url: () => 'http://localhost:3000/invoices/3f991e08-0959-44e0-99c2-foldosfdf',
            method: () => 'GET',
            headers: () => ({ 'x-mock-method': 'POST' }) as Headers,
            postData: () => JSON.stringify({ id: '109736052' }),
            response
        },
        {
            url: () => 'http://localhost:3000/invoices/3f991e08-0959-44e0-99c2-ujolololo',
            method: () => 'PUT',
            headers: () => ({}) as Headers,
            postData: () => JSON.stringify({ id: '228' }),
            response
        },
        {
            method: () => 'GET',
            headers: () => ({}) as Headers,
            url: () => 'http://localhost:3000/invoices/1',
            postData: () => JSON.stringify({ id: '1' })
        },
        {
            url: () => 'http://localhost:3000/invoices/3f991e08-0959-44e0-99c2-44e0eadsv',
            method: () => 'POST',
            headers: () => ({
                'x-mock-body': JSON.stringify({ id: '228' })
            }) as Headers,
            postData: () => undefined,
            response
        },
        {
            method: () => 'GET',
            headers: () => ({}) as Headers,
            url: () => 'http://localhost:3000/invoices/1',
            postData: () => JSON.stringify({ id: '2' })
        },
        {
            method: () => 'GET',
            headers: () => ({}) as Headers,
            url: () => 'http://localhost:3000/invoices/1',
            postData: () => JSON.stringify({ id: '3' })
        }
    ] as unknown as puppeteer.Request[];

    describe('#getRequestpostData', () => {

        it('should get specified request number', () => {
            const actual = NetworkUtils.getRequestBody(
                requests,
                'http://localhost:3000/invoices/1',
                'GET',
                1
            ) as AnyDictionary;
            expect(actual.id).toEqual('2');
        });

        it('should get the last request if order is not specified', () => {
            const actual = NetworkUtils.getRequestBody(
                requests,
                'http://localhost:3000/invoices/1',
                'GET'
            ) as AnyDictionary;
            expect(actual.id).toEqual('3');
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
