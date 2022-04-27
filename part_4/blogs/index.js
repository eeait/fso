const http = require("http")
const app = require("./app")
const config = require("./utils/config")
const { info } = require("./utils/logger")

const server = http.createServer(app)

const port = config.PORT
server.listen(port, () => {
  info(`Server running on port ${port}`)
})
