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

    // Fetch some entries to test content retrieval
    const entries = await client.getEntries({
      limit: 10,
    });

    return NextResponse.json({
      success: true,
      entries: entries.items,
      total: entries.total,
      message: `Successfully fetched ${entries.items.length} entries`
    });

  } catch (error) {
    console.error('Contentful content fetch error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      message: 'Failed to fetch content from Contentful',
      entries: []
    }, { status: 500 });
  }
}