import {expect} from 'chai';
import { describe } from 'mocha';
import {CategoryRepository} from '../src/repositories/index'

let categoryRepository = new CategoryRepository();


describe('Category Unit Tesing',function(){
    it('should not return null',function(){
        let result =  this.categoryRepository.get()
        expect(result).to.equal(null);
    });
});