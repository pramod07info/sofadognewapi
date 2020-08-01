import {expect} from 'chai';
import { describe } from 'mocha';
import { FeedRepository } from '../src/repositories/index'
import { IFeed } from '../src/model';
import { IRefreshLog } from '../src/model/';

let feedRepository = new FeedRepository();
describe('Feed unit tesing',function(){

    it('Feeds should be array',async function(){
        let refreshLog: IRefreshLog = {
            uuid: '231231adasdas',
            os: 'IOS',
            height:1212
        };
        const result = await feedRepository.get(refreshLog);
        expect(result).to.be.an('array');
    });
    it('Feeds should be array and pass ordinal param',async function(){
        let refreshLog: IRefreshLog = {
            uuid: '231231adasdas',
            os: 'IOS',
            height:1212,
            ordinal:1928
        };
        const result = await feedRepository.get(refreshLog);
        expect(result).to.be.an('array');
    });
});