/* eslint-disable @typescript-eslint/no-explicit-any */
import * as puppeteer from 'puppeteer-core';
import { remote } from '..';

type AsyncReturnType<T extends (...args: any) => any> =
    T extends (...args: any) => Promise<infer U> ? U :
        T extends (...args: any) => infer U ? U :
            any;

export type Browser = AsyncReturnType<typeof remote>;
export type Devtools = AsyncReturnType<typeof puppeteer.connect>;
