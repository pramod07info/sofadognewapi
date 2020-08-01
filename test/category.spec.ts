import {expect} from 'chai';
import { describe } from 'mocha';
import { CategoryRepository } from '../src/repositories/index'
import { ICategory } from '../src/model';

let categoryRepository = new CategoryRepository();
describe('Category Unit Tesing',function(){
    it('should not return null',async function(){
        const result = await categoryRepository.get();    
        expect(result).to.not.equal(null);
    });

    it('should be array',async function(){
        const result = await categoryRepository.get();
        expect(result).to.be.an('array');
    });

    it('should have length 8',async function(){
        const result = await categoryRepository.get();
        expect(result.length).to.equal(8)
    });
});