import { PrismaClient } from '@prisma/client'
import * as bodyParser from 'body-parser'
import express from 'express'
import { get } from 'http'
import { title } from 'process'

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
  const posts = await prisma.categories.findMany({
    select:{
      id:true,
      color:true,
      title:true
    }
    
  })
  res.json(posts)
})

const server = app.listen(3000, () =>
  console.log(
    ' Server ready at: http://localhost:3000',
  ),
)
