import { sql } from "@vercel/postgres";

export async function getCanvases(userId: string) {
  const { rows } = await sql`SELECT * FROM canvas WHERE user_id = ${userId}`;
  return rows;
}

export async function getCanvas(id: string) {
  const { rows } = await sql`SELECT * FROM canvas WHERE id = ${id}`;
  return rows[0];
}

export async function createCanvas(userId: string, title: string, content: any) {
  const { rows } = await sql`
    INSERT INTO canvas (user_id, title, content)
    VALUES (${userId}, ${title}, ${JSON.stringify(content)})
    RETURNING *
  `;
  return rows[0];
}

export async function updateCanvas(id: string, title: string, content: any) {
  const { rows } = await sql`
    UPDATE canvas
    SET title = ${title}, content = ${JSON.stringify(content)}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0];
}

export async function deleteCanvas(id: string) {
  await sql`DELETE FROM canvas WHERE id = ${id}`;
}