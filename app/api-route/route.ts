import { apiGetWidgetById } from '@/api/widget';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id') as string;
    const widget = await apiGetWidgetById(id);

    if (!widget) {
      return NextResponse.json('Widget not found', { status: 404 });
    }

    const res = NextResponse.json(widget, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Security-Policy': 'frame-ancestors *',
        'Content-Type': 'application/json',
      },
    });
    return res;
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
