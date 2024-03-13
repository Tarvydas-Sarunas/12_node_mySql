import mysql from 'mysql2/promise';
import { dbConfig } from '../config.js';

// pagalbine funkcija paiimti viena posta
export default async function dbQueryWithData(sql: string, argArr: (string | number)[] = []) {
  let conn;
  try {
    // prisijungti pre DB
    conn = await mysql.createConnection(dbConfig);
    // ka noriu padaryti
    // const sql = 'SELECT * FROM `posts`';
    // vykdyti auksciau aprasyta nora
    const [rows] = await conn.execute(sql, argArr);
    // ir jei noras ivykditas pranesti
    return [rows, null];
  } catch (error) {
    // jei yra klaida tai klaidos blokas
    return [null, error];
  } finally {
    // atsijungti nuo DB jei prisijungimas buvo
    if (conn) conn.end();
  }
}
