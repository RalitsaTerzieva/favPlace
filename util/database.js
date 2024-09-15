export async function init(db) {
    if (!db) return;
    
    try {
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);
    `);
    } catch (e) {
        console.log(e)
    }

}