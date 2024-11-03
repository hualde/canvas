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
  console.log('Updating canvas in database:', { id, ...canvasData });
  const { rows } = await sql`
    UPDATE canvas
    SET 
      title = ${canvasData.title},
      content = ${JSON.stringify(canvasData.content)},
      project_name = ${canvasData.project_name},
      author = ${canvasData.author},
      date = ${canvasData.date ? new Date(canvasData.date) : null},
      comments = ${canvasData.comments},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;
  console.log('Database update result:', rows[0]);
  return rows[0];
}

export async function deleteCanvas(id: string) {
  await sql`DELETE FROM canvas WHERE id = ${id}`;
}