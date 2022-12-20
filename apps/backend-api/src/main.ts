import server from './createServer'

server.listen({ port: Number(process.env.PORT) }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
