import {expect} from 'chai';
import { describe } from 'mocha';
import { CategoryRepository } from '../src/repositories/index'
import { ICategory } from '../src/model';

let categoryRepository = new CategoryRepository();
describe('Category Unit Tesing',function(){
    it('should not return null',async function(){
        const result = await categoryRepository.get();
        let categories: ICategory[] = [];
        result.forEach(function(data){
            var category: ICategory = {
                id: String(data.ordinal),
                colour: data.color,
                title: data.title
            }
            categories.push(category);
        });
        expect(categories).to.not.equal(null);
    });

    it('should be array',async function(){
        const result = await categoryRepository.get();
        let categories: ICategory[] = [];
        result.forEach(function(data){
            var category: ICategory = {
                id: String(data.ordinal),
                colour: data.color,
                title: data.title
            }
            categories.push(category);
        });
        expect(categories).to.be.an('array');
    });

    it('should have length 8',async function(){
        const result = await categoryRepository.get();
        let categories: ICategory[] = [];
        result.forEach(function(data){
            var category: ICategory = {
                id: String(data.ordinal),
                colour: data.color,
                title: data.title
            }
            categories.push(category);
        });
        expect(categories.length).to.equal(8)
    });

    it('should be in ascending order',async function(){
        const result = await categoryRepository.get();
        let categories: ICategory[] = [];
        result.forEach(function(data){
            var category: ICategory = {
                id: String(data.ordinal),
                colour: data.color,
                title: data.title
            }
            categories.push(category);
        });
        console.log(categories);
        expect(categories).to.equal(8)
    });
});