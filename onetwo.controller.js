const db = require('./db')

class OneTwoController {
  async create (req, res) {
    try {
      const {one, two} = req.body
      const newOneTwo = await db.query(`INSERT INTO onetwo (one, two, date) values ($1, $2, $3) RETURNING *`, [one, two, Date.now()])
      res.status(200).json(true)
    } catch (e) {
      res.status(500).json(false)
    }
  }

  async getAll (req, res) {
    try {
      const all = await db.query(`SELECT * from onetwo`)
      res.status(200).json(all.rows)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

module.exports = new OneTwoController()
