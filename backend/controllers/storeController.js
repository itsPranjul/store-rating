const pool = require('../config/db');

exports.getStores = async (req, res) => {
  try {
    const { search, sortBy = 'name', sortOrder = 'ASC' } = req.query;
    let query = `
      SELECT s.id, s.name, s.address,
             COALESCE(AVG(r.rating), 0) as overall_rating,
             ur.rating as user_rating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      LEFT JOIN ratings ur ON s.id = ur.store_id AND ur.user_id = $1
      WHERE 1=1
    `;
    const params = [req.user.id];

    if (search) {
      query += ` AND (s.name ILIKE $${params.length + 1} OR s.address ILIKE $${params.length + 1})`;
      params.push(`%${search}%`);
    }

    query += ` GROUP BY s.id, ur.rating ORDER BY ${sortBy} ${sortOrder}`;

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Get stores error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
