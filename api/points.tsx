import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error('MONGODB_URI environment variable is not set');

const client = new MongoClient(MONGODB_URI);
let db;

async function connectToDatabase() {
  try {
    // Check if the client is connected before attempting to connect.
    if (!client.connect) { // Use client.connected instead of client.topology
      await client.connect();
      console.log("Connected to MongoDB");
    }
    db = client.db('tapmenot');
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { telegramUserId, points, taps } = req.body;
  if (!telegramUserId) {
    return res.status(400).json({ error: 'telegramUserId required' });
  }

  try {
    await connectToDatabase();
    const collection = db.collection('points');

    const result = await collection.updateOne(
      { telegramUserId },
      { $set: { points, taps } },  //  update points and taps
      { upsert: true }         //  create if it doesn't exist
    );

    res.status(200).json({
      success: true,
      message: 'Points and taps updated successfully',
      updatedCount: result.modifiedCount,
      upsertedId: result.upsertedId,
    });
  } catch (error) {
    console.error('Error updating points and taps:', error);
    res.status(500).json({ error: 'Failed to update points and taps', details: error.message });
  }
}
