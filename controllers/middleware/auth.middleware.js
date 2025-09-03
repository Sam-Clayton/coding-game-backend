import { getAuth } from '@clerk/express';
import { findUserByClerkId } from '../models/userModel.js';

export async function requireAuthApi(req, res, next) {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
 
  req.userId = userId;
  next();
}

export async function requireAdmin(req, res, next) {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const user = await findUserByClerkId(userId);
    if (!user || !user.is_admin) {
      return res.status(403).json({ error: 'Forbidden - Admins only' });
    }
    next();
  } catch (err) {
    console.error('[requireAdmin] DB error', err);
    res.status(500).json({ error: 'Server error' });
  }
}