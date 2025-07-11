const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const validateName = (name) => name && name.length >= 2 && name.length <= 60;
const validateAddress = (address) => !address || address.length <= 400;
const validatePassword = (password) => /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/.test(password);
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

exports.getDashboard = async (req, res) => {
  try {
    const [usersCount, storesCount, ratingsCount] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM users'),
      pool.query('SELECT COUNT(*) FROM stores'),
      pool.query('SELECT COUNT(*) FROM ratings')
    ]);
    res.json({
      totalUsers: parseInt(usersCount.rows[0].count),
      totalStores: parseInt(storesCount.rows[0].count),
      totalRatings: parseInt(ratingsCount.rows[0].count)
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { search, role, sortBy = 'name', sortOrder = 'ASC' } = req.query;
    let query = 'SELECT id, name, email, address, role FROM users WHERE 1=1';
    const params = [];

    if (search) {
      query += ` AND (name ILIKE $${params.length + 1} OR email ILIKE $${params.length + 1} OR address ILIKE $${params.length + 1})`;
      params.push(`%${search}%`);
    }
    if (role) {
      query += ` AND role = $${params.length + 1}`;
      params.push(role);
    }
    query += ` ORDER BY ${sortBy} ${sortOrder}`;

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    if (!validateName(name)) {
      return res.status(400).json({ message: 'Name must be between 20-60 characters' });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'Password must be 8-16 characters with at least one uppercase letter and one special character' });
    }
    if (!validateAddress(address)) {
      return res.status(400).json({ message: 'Address must be max 400 characters' });
    }

    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, address, role',
      [name, email, hashedPassword, address, role]
    );

    res.status(201).json({ message: 'User created successfully', user: result.rows[0] });
  } catch (err) {
    console.error('Create user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStores = async (req, res) => {
  try {
    const { search, sortBy = 'name', sortOrder = 'ASC' } = req.query;
    let query = `
      SELECT s.id, s.name, s.email, s.address,
             COALESCE(AVG(r.rating), 0) as rating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      WHERE 1=1
    `;
    const params = [];

    if (search) {
      query += ` AND (s.name ILIKE $${params.length + 1} OR s.email ILIKE $${params.length + 1} OR s.address ILIKE $${params.length + 1})`;
      params.push(`%${search}%`);
    }

    query += ` GROUP BY s.id ORDER BY ${sortBy} ${sortOrder}`;

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Get stores error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createStore = async (req, res) => {
  try {
    const { name, email, address, ownerEmail } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    if (!validateAddress(address)) {
      return res.status(400).json({ message: 'Address must be max 400 characters' });
    }

    const existing = await pool.query('SELECT * FROM stores WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Store already exists' });
    }

    let ownerId = null;
    if (ownerEmail) {
      const ownerResult = await pool.query('SELECT id FROM users WHERE email = $1', [ownerEmail]);
      if (ownerResult.rows.length > 0) {
        ownerId = ownerResult.rows[0].id;
      }
    }

    const result = await pool.query(
      'INSERT INTO stores (name, email, address, owner_id) VALUES ($1, $2, $3, $4) RETURNING id, name, email, address',
      [name, email, address, ownerId]
    );

    res.status(201).json({ message: 'Store created successfully', store: result.rows[0] });
  } catch (err) {
    console.error('Create store error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
