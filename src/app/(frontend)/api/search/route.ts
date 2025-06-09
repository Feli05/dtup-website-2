import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('search') || '';
  const categoryId = searchParams.get('category');
  
  // Disable caching for now to debug search issues
  const headers = {
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  };
  
  try {
    const payload = await getPayload({ config: configPromise });
    
    const where: any = {};
    
    if (query) {
      where.or = [
        { name: { contains: query } },
        { description: { contains: query } },
        { 'tags.tag': { contains: query } }
      ];
    }
    
    if (categoryId) {
      where.category = { equals: categoryId };
    }
    
    // Return empty array if no search criteria
    if (!query && !categoryId) {
      return NextResponse.json({ businesses: [] }, { headers });
    }
    
    const results = await payload.find({
      collection: 'businesses',
      where,
      depth: 1, // Include related data
      limit: 20,
    });
    
    return NextResponse.json({ 
      businesses: results.docs,
      totalCount: results.totalDocs
    }, { headers });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
} 