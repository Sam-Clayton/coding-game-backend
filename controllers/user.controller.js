import { getAuth } from '@clerk/express';
import { findUserByClerkId } from '../models/userModel.js';

export async function getProfile(req, res) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const user = await findUserByClerkId(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found in database' });
    }

    res.json({
      id: user.id,
      username: user.username,
      avatarUrl: user.avatar_url,
      level: user.level,
      xp: user.xp,
      isAdmin: user.is_admin,
    });
  } catch (err) {
    console.error('[getProfile] DB error', err);
    res.status(500).json({ error: 'Server error' });
  }
}