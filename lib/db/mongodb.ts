import dns from 'dns';

// Fix for Windows / Node.js SRV DNS resolution failure (querySrv ECONNREFUSED)
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  // Ignore if not supported in environment
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://prayxistechnologies_db_user:1234asdfG@prayxis-web.w2cyjti.mongodb.net/prayxis_db?retryWrites=true&w=majority&appName=Prayxis-web';

let client: any = null;
let clientPromise: Promise<any> | null = null;

export async function getMongoDb() {
  try {
    try {
      dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
    } catch (e) {}

    const { MongoClient } = await import('mongodb');
    if (!clientPromise) {
      client = new MongoClient(MONGODB_URI, {
        serverSelectionTimeoutMS: 8000,
        connectTimeoutMS: 8000,
      });
      clientPromise = client.connect();
    }
    const connectedClient = await clientPromise;
    return connectedClient.db('prayxis_db');
  } catch (err: any) {
    console.warn('[MongoDB Atlas] Native client not available or failing to connect:', err);
    clientPromise = null;
    return null;
  }
}

export async function getMongoHealth() {
  let isAtlasConnected = false;
  let connectionError: string | null = null;
  try {
    const db = await getMongoDb();
    if (db) {
      await db.command({ ping: 1 });
      isAtlasConnected = true;
    } else {
      isAtlasConnected = false;
      connectionError = 'Database client returned null on connection attempt';
    }
  } catch (e: any) {
    isAtlasConnected = false;
    connectionError = e.message || String(e);
  }

  return {
    configured: true,
    status: isAtlasConnected ? 'CONNECTED TO ATLAS CLOUD' : 'CONNECTION FAILED',
    uri: MONGODB_URI.replace(/:([^@]+)@/, ':****@'),
    cluster: 'prayxis-web.w2cyjti.mongodb.net',
    database: 'prayxis_db',
    isAtlasConnected,
    connectionError,
  };
}

