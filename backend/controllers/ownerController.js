const pool = require('../config/db');

exports.getDashboard = async (req, res) => {
  try {
    const storeResult = await pool.query('SELECT id FROM stores WHERE owner_id = $1', [req.user.id]);
    if (storeResult.rows.length === 0) {
      return res.status(404).json({ message: 'No store found for this owner' });
    }

    const storeId = storeResult.rows[0].id;

    const ratingsResult = await pool.query(
      `SELECT u.name, u.email, r.rating, r.created_at
       FROM ratings r
       JOIN users u ON r.user_id = u.id
       WHERE r.store_id = $1
       ORDER BY r.created_at DESC`,
      [storeId]
    );

    const avgResult = await pool.query(
      'SELECT AVG(rating) as average_rating FROM ratings WHERE store_id = $1',
      [storeId]
    );

    res.json({
      ratings: ratingsResult.rows,
      averageRating: parseFloat(avgResult.rows[0].average_rating) || 0
    });
  } catch (err) {
    console.error('Owner dashboard error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
