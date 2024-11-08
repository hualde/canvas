import { sql } from "@vercel/postgres";

if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL is not set in the environment variables');
}

interface CanvasData {
  id: string;
  title: string;
  type: string;
  content: any;
  project_name: string;
  author: string;
  date: string;
  comments: string;
  updated_at: string;
}

const FREE_USER_CANVAS_LIMIT = 3;

// Fetch all canvases for a user
export async function getCanvases(userId: string): Promise<CanvasData[]> {
  try {
    const { rows } = await sql`
      SELECT 
        id, 
        title,
        type, 
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

// Fetch a single canvas by ID
export async function getCanvas(id: string): Promise<CanvasData | null> {
  try {
    const { rows } = await sql`
      SELECT 
        id, 
        title,
        type, 
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

// Create a new canvas
export async function createCanvas(userId: string, title: string, type: string): Promise<CanvasData> {
  try {
    const subscriptionTier = await getUserSubscription(userId);
    if (subscriptionTier !== 'premium') {
      const canvasCount = await getCanvasCount(userId);
      if (canvasCount >= FREE_USER_CANVAS_LIMIT) {
        throw new Error('Free users can only create up to 3 canvases. Please upgrade to create more.');
      }
    }

    let defaultContent: { [key: string]: string[] } = {};
    
    // Set default content based on canvas type
    if (type === 'Business Model') {
      defaultContent = {
        keyPartners: [],
        keyActivities: [],
        keyResources: [],
        valuePropositions: [],
        customerRelationships: [],
        channels: [],
        customerSegments: [],
        costStructure: [],
        revenueStreams: []
      };
    } else if (type === 'Value Proposition') {
      defaultContent = {
        productsAndServices: [],
        gainCreators: [],
        painRelievers: [],
        customerJobs: [],
        gains: [],
        pains: []
      };
    } else if (type === 'SWOT Analysis') {
      defaultContent = {
        strengths: [],
        weaknesses: [],
        opportunities: [],
        threats: []
      };
    } else if (type === 'Empathy Map') {
      defaultContent = {
        says: [],
        thinks: [],
        does: [],
        feels: []
      };
    } else if (type === 'PESTEL Analysis') {
      defaultContent = {
        political: [],
        economic: [],
        social: [],
        technological: [],
        environmental: [],
        legal: []
      };
    }

    const { rows } = await sql`
      INSERT INTO canvas (user_id, title, type, content, project_name, author, date, comments, updated_at)
      VALUES (
        ${userId}, 
        ${title},
        ${type}, 
        ${JSON.stringify(defaultContent)}, 
        '', 
        '', 
        CURRENT_DATE AT TIME ZONE 'UTC', 
        '',
        CURRENT_TIMESTAMP AT TIME ZONE 'UTC'
      )
      RETURNING 
        id, 
        title,
        type, 
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

// Update an existing canvas
export async function updateCanvas(id: string, canvasData: Partial<CanvasData>): Promise<CanvasData> {
  console.log('Updating canvas in database:', { id, ...canvasData });
  try {
    const { rows } = await sql`
      UPDATE canvas
      SET 
        title = COALESCE(${canvasData.title}, title),
        type = COALESCE(${canvasData.type}, type),
        content = COALESCE(${JSON.stringify(canvasData.content)}, content),
        project_name = COALESCE(${canvasData.project_name}, project_name),
        author = COALESCE(${canvasData.author}, author),
        date = COALESCE(${canvasData.date}::date AT TIME ZONE 'UTC', date),
        comments = COALESCE(${canvasData.comments}, comments),
        updated_at = CURRENT_TIMESTAMP AT TIME ZONE 'UTC'
      WHERE id = ${id}
      RETURNING 
        id, 
        title,
        type, 
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

// Delete a canvas
export async function deleteCanvas(id: string): Promise<void> {
  try {
    await sql`DELETE FROM canvas WHERE id = ${id}`;
  } catch (error) {
    console.error('Error deleting canvas:', error);
    throw error;
  }
}

// Get user's subscription tier
export async function getUserSubscription(userId: string): Promise<string> {
  try {
    const { rows } = await sql`
      SELECT subscription_tier
      FROM user_subscriptions
      WHERE user_id = ${userId}
    `;
    return rows[0]?.subscription_tier || 'free';
  } catch (error) {
    console.error('Error fetching user subscription:', error);
    return 'free';
  }
}

// Set or update user's subscription tier
export async function setUserSubscription(userId: string, tier: string): Promise<void> {
  try {
    await sql`
      INSERT INTO user_subscriptions (user_id, subscription_tier)
      VALUES (${userId}, ${tier})
      ON CONFLICT (user_id)
      DO UPDATE SET subscription_tier = ${tier}, updated_at = CURRENT_TIMESTAMP AT TIME ZONE 'UTC'
    `;
  } catch (error) {
    console.error('Error setting user subscription:', error);
    throw error;
  }
}

// Get the count of canvases for a user
export async function getCanvasCount(userId: string): Promise<number> {
  try {
    const { rows } = await sql`
      SELECT COUNT(*) as count
      FROM canvas
      WHERE user_id = ${userId}
    `;
    return parseInt(rows[0].count, 10);
  } catch (error) {
    console.error('Error counting canvases:', error);
    throw error;
  }
}

// Check if a user can create a new canvas
export async function canUserCreateCanvas(userId: string): Promise<boolean> {
  const subscriptionTier = await getUserSubscription(userId);
  
  if (subscriptionTier === 'premium') {
    return true;
  }

  const canvasCount = await getCanvasCount(userId);
  return canvasCount < FREE_USER_CANVAS_LIMIT;
}