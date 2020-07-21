import { PrismaClient } from '@prisma/client'
import * as bodyParser from 'body-parser'
import express from 'express'
import { get } from 'http'
import { title } from 'process'

const prisma = new PrismaClient()
const app = express()

interface IFeed{
  id: any,
  enqueued: any,
  ordinal: any,
  url: any,
  published: any,
  categories: any,
  credits: any,
  title: any
}

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
  const posts = await prisma.categories.findMany({
    where:{
      is_active:true
    }, 
    select:{
      id:true,
      color:true,
      title:true
    }
  })
  res.json(posts)
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
 
  let response:IFeed[] = [];
  
  posts.forEach(function(data){
    let cat= [];
    if(data.categories != null){
      cat.push(data.categories.id.toString());
    }
    var result:IFeed = {
      id: data.id,
      enqueued: data.enqueued,
      ordinal: data.ordinal,
      url: data.url,
      published: data.published,
      categories:cat,
      credits: data.credits,
      title: data.title
    }
    response.push(result)
  });

  res.json(response)
})

const server = app.listen(3000, () =>
  console.log(
    ' Server ready at: http://localhost:3000',
  ),
)
