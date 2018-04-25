const umpack = require('./umpack')

async function seed() {
  try {
    await umpack.initWithFullAccess('1')
  } catch (error) {
    console.error(error)

    throw error
  }
}

seed()
