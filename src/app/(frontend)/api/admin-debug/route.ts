import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export async function GET() {
  try {
    // Test payload configuration
    const payload = await getPayload({ config: configPromise });
    
    // Test admin-related environment variables
    const adminConfig = {
      NEXT_PUBLIC_PAYLOAD_URL: process.env.NEXT_PUBLIC_PAYLOAD_URL,
      PAYLOAD_SECRET: !!process.env.PAYLOAD_SECRET, // Don't expose the actual secret
      MONGO_URI: !!process.env.MONGO_URI,
      NODE_ENV: process.env.NODE_ENV,
      adminUserCollection: payload.config.admin?.user,
    };
    
    // Test if we can access users collection (for admin login)
    let userCount = 0;
    try {
      const users = await payload.count({
        collection: 'users'
      });
      userCount = users.totalDocs;
    } catch (error) {
      console.error('Users collection error:', error);
    }
    
    return NextResponse.json({
      status: 'admin-check',
      timestamp: new Date().toISOString(),
      config: adminConfig,
      userCount,
      payloadConfigured: !!payload.config,
    });
    
  } catch (error) {
    console.error('Admin debug error:', error);
    
    return NextResponse.json({
      status: 'admin-error',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
} 