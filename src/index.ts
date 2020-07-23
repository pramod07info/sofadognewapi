import * as bodyParser from 'body-parser'
import express from 'express'

import { ICategory,IFeed } from './model/index'
import { CategoryRepository,FeedRepository } from './repositories/index'

const app = express()
const categoryRepository = new CategoryRepository()
const feedRepository = new FeedRepository()

app.use(bodyParser.json())

app.post(`/categories`, async (req, res) => {
	const result = await categoryRepository.post(req)
	var category: ICategory = {
		id: result.id,
		color: result.color,
		title: result.title
	}
 	res.json(category)
})

app.get('/categories', async (req, res) => {
	const result = await categoryRepository.get(req)
	let categories: ICategory[] = [];
	result.forEach(function(data){
		var category: ICategory = {
			id: data.id,
			color: data.color,
			title: data.title
		}
		categories.push(category);
	});
  	res.json(categories)
})

app.get('/refresh', async (req, res) => {
	const result = await feedRepository.get(req)
  	let feeds:IFeed[] = [];
  
	result.forEach(function(data){
		let cat= [];
		if(data.categories != null){
			cat.push(data.categories.id.toString());
		}
		var feed:IFeed = {
			id: data.id,
			enqueued: data.enqueued,
			ordinal: data.ordinal,
			url: data.url,
			published: data.published,
			categories:cat,
			credits: data.credits,
			title: data.title
		}
		feeds.push(feed)
  	});
  	res.json(feeds)
})

const server = app.listen(3000, () =>
  	console.log(
    	' Server ready at: http://localhost:3000',
  	),
)
