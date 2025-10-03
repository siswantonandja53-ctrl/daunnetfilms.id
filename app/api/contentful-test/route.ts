import { NextResponse } from 'next/server';
import { createClient } from 'contentful';

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID || 'dvoi3lns71io';
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN || 'PMHlpVDixr-Fp4GkhDvt7YxPopU45mYTJkRaAv3osnk';

export async function GET() {
  try {
    // Create Contentful client
    const client = createClient({
      space: CONTENTFUL_SPACE_ID,
      accessToken: CONTENTFUL_ACCESS_TOKEN,
    });

    // Test connection by fetching space info
    const space = await client.getSpace();
    
    return NextResponse.json({
      success: true,
      spaceId: space.sys.id,
      spaceName: space.name,
      environment: 'master',
      message: 'Successfully connected to Contentful'
    });

  } catch (error) {
    console.error('Contentful connection error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      message: 'Failed to connect to Contentful'
    }, { status: 500 });
  }
}