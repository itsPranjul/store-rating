const pool = require('../config/db');

exports.submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const storeExists = await pool.query('SELECT * FROM stores WHERE id = $1', [storeId]);
    if (storeExists.rows.length === 0) {
      return res.status(404).json({ message: 'Store not found' });
    }

    const result = await pool.query(
      `INSERT INTO ratings (user_id, store_id, rating)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, store_id)
       DO UPDATE SET rating = $3, updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [req.user.id, storeId, rating]
    );

    res.json({ message: 'Rating submitted successfully', rating: result.rows[0] });
  } catch (err) {
    console.error('Submit rating error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
