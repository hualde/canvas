import { sql } from "@vercel/postgres";

// Verifica que la conexión esté configurada correctamente
if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL is not set in the environment variables');
}

interface CanvasData {
  id: string;
  title: string;
  content: any;
  project_name: string;
  author: string;
  date: string;
  comments: string;
  updated_at: string;
}

export async function getCanvases(userId: string): Promise<CanvasData[]> {
  try {
    const { rows } = await sql`
      SELECT 
        id, 
        title, 
        project_name, 
        author, 
        to_char(date AT TIME ZONE 'UTC', 'YYYY-MM-DD') as date, 
        to_char(updated_at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as updated_at
      FROM canvas
      WHERE user_id = ${userId}
      ORDER BY updated_at DESC
    `;
    return rows;
  } catch (error) {
    console.error('Error fetching canvases:', error);
    throw error;
  }
}

export async function getCanvas(id: string): Promise<CanvasData | null> {
  try {
    const { rows } = await sql`
      SELECT 
        id, 
        title, 
        content, 
        project_name, 
        author, 
        to_char(date AT TIME ZONE 'UTC', 'YYYY-MM-DD') as date, 
        comments,
        to_char(updated_at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as updated_at
      FROM canvas
      WHERE id = ${id}
    `;
    return rows[0] || null;
  } catch (error) {
    console.error('Error fetching canvas:', error);
    throw error;
  }
}

export async function createCanvas(userId: string, title: string, content: any): Promise<CanvasData> {
  try {
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
      RETURNING 
        id, 
        title, 
        content, 
        project_name, 
        author, 
        to_char(date AT TIME ZONE 'UTC', 'YYYY-MM-DD') as date, 
        comments,
        to_char(updated_at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as updated_at
    `;
    return rows[0];
  } catch (error) {
    console.error('Error creating canvas:', error);
    throw error;
  }
}

export async function updateCanvas(id: string, canvasData: Partial<CanvasData>): Promise<CanvasData> {
  console.log('Updating canvas in database:', { id, ...canvasData });
  try {
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
        to_char(date AT TIME ZONE 'UTC', 'YYYY-MM-DD') as date, 
        comments,
        to_char(updated_at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as updated_at
    `;
    console.log('Database update result:', rows[0]);
    return rows[0];
  } catch (error) {
    console.error('Error updating canvas:', error);
    throw error;
  }
}

export async function deleteCanvas(id: string): Promise<void> {
  try {
    await sql`DELETE FROM canvas WHERE id = ${id}`;
  } catch (error) {
    console.error('Error deleting canvas:', error);
    throw error;
  }
}