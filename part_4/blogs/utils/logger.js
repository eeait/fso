const info = (...params) => {
  console.log(...params)
}

const logerror = (...params) => {
  console.error(...params)
}

module.exports = {
  info,
  logerror,
}
