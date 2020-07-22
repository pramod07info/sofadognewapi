import { PrismaClient } from '@prisma/client'
import * as bodyParser from 'body-parser'
import express from 'express'
import { get } from 'http'
import { title } from 'process'

import { IFeed } from './model/feed'
import { ICategory } from './model/category'

const prisma = new PrismaClient()
const app = express()

app.use(bodyParser.json())

app.post(`/categories`, async (req, res) => {
  const result = await prisma.categories.create({
    data: {
      ...req.body,
    },
  })
 res.json(result)
})

app.get('/categories', async (req, res) => {
  const result = await prisma.categories.findMany({
    where:{
      is_active:true
    }, 
    select:{
      id:true,
      color:true,
      title:true
    }
  })

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
  const posts = await prisma.feeds.findMany({
    where:{
      published:true
    },
    select:{
      id:true,
      enqueued:true,
      ordinal:true,
      url:true,
      published:true,
      categories:{
        select:{
          id:true
        }
      },
      credits:true,
      title:true
    }
   
  })
 
  let feeds:IFeed[] = [];
  
  posts.forEach(function(data){
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
