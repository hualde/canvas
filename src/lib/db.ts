import { sql } from "@vercel/postgres";

// Verifica que la conexión esté configurada correctamente
if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL is not set in the environment variables');
}

export async function getCanvases(userId: string) {
  const { rows } = await sql`
    SELECT 
      id, 
      title, 
      project_name, 
      author, 
      date AT TIME ZONE 'UTC' as date, 
      updated_at AT TIME ZONE 'UTC' as updated_at
    FROM canvas
    WHERE user_id = ${userId}
    ORDER BY updated_at DESC
  `;
  return rows;
}

export async function getCanvas(id: string) {
  const { rows } = await sql`
    SELECT 
      id, 
      title, 
      content, 
      project_name, 
      author, 
      date AT TIME ZONE 'UTC' as date, 
      comments,
      updated_at AT TIME ZONE 'UTC' as updated_at
    FROM canvas
    WHERE id = ${id}
  `;
  return rows[0];
}

export async function createCanvas(userId: string, title: string, content: any) {
  const { rows } = await sql`
    INSERT INTO canvas (user_id, title, content, project_name, author, date, comments, updated_at)
    VALUES (
      ${userId}, 
      ${title}, 
      ${JSON.stringify(content)}, 
      '', 
      '', 
      CURRENT_DATE AT TIME ZONE 'UTC', 
      '',
      CURRENT_TIMESTAMP AT TIME ZONE 'UTC'
    )
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
      date = ${canvasData.date}::date AT TIME ZONE 'UTC',
      comments = ${canvasData.comments},
      updated_at = CURRENT_TIMESTAMP AT TIME ZONE 'UTC'
    WHERE id = ${id}
    RETURNING 
      id, 
      title, 
      content, 
      project_name, 
      author, 
      date AT TIME ZONE 'UTC' as date, 
      comments,
      updated_at AT TIME ZONE 'UTC' as updated_at
  `;
  console.log('Database update result:', rows[0]);
  return rows[0];
}

export async function deleteCanvas(id: string) {
  await sql`DELETE FROM canvas WHERE id = ${id}`;
}