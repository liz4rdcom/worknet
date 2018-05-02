const umpack = require('./umpack')

async function seed() {
  try {
    await umpack.initWithFullAccess('1')

    process.exit(0)
  } catch (error) {
    console.error(error)

    process.exit(1)
  }
}

seed()
