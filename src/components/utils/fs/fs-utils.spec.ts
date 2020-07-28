import { FsUtils } from './fs-utils';

describe('#getJsonContent', () => {

    it('should return content of json', () => {
        const content = FsUtils.getJsonContent(`${__dirname}/api-response.json`);
        expect(content).toEqual({ id: '123' });
    });
});
