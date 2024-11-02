import { sql } from "@vercel/postgres";

// Verifica que la conexión esté configurada correctamente
if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL is not set in the environment variables');
}

export async function getCanvases(userId: string) {
  const { rows } = await sql`
    SELECT id, title, project_name, author, date, updated_at
    FROM canvas
    WHERE user_id = ${userId}
    ORDER BY updated_at DESC
  `;
  return rows;
}

export async function getCanvas(id: string) {
  const { rows } = await sql`
    SELECT id, title, content, project_name, author, date, comments
    FROM canvas
    WHERE id = ${id}
  `;
  return rows[0];
}

export async function createCanvas(userId: string, title: string, content: any) {
  const { rows } = await sql`
    INSERT INTO canvas (user_id, title, content, project_name, author, date, comments)
    VALUES (${userId}, ${title}, ${JSON.stringify(content)}, '', '', CURRENT_DATE, '')
    RETURNING *
  `;
  return rows[0];
}

export async function updateCanvas(id: string, canvasData: any) {
  const { rows } = await sql`
    UPDATE canvas
    SET 
      title = ${canvasData.title},
      content = ${JSON.stringify(canvasData.content)},
      project_name = ${canvasData.projectName},
      author = ${canvasData.author},
      date = ${canvasData.date},
      comments = ${canvasData.comments},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0];
}

export async function deleteCanvas(id: string) {
  await sql`DELETE FROM canvas WHERE id = ${id}`;
}

export async function getCanvasByShareId(shareId: string) {
  const { rows } = await sql`
    SELECT id, title, content, project_name, author, date, comments
    FROM canvas
    WHERE share_id = ${shareId}
  `;
  return rows[0];
}

export async function updateShareId(id: string, shareId: string) {
  const { rows } = await sql`
    UPDATE canvas
    SET share_id = ${shareId}
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0];
}