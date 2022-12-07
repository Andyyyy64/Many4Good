import express from 'express'
const app = express()

const port = 4000

app.listen(port, () => {
    console.log(`server started on port ${port}`)
})

app.get("/api",(req:express.Request,res:express.Response) => {
    res.set({ 'Access-Control-Allow-Origin': '*' })
    res.json({"users" : ["userone","usertwo","userthree"]})
})