export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { NextResponse, NextRequest } from "next/server";
import { corsHeaders } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const clipId = url.searchParams.get('id');

    if (!clipId) {
      return new NextResponse(JSON.stringify({ error: 'Missing parameter id' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Dynamic import prevents Next.js from executing SunoApi during build
    const { sunoApi } = await import("@/lib/SunoApi");
    const audioInfo = await (await sunoApi()).getClip(String(clipId));

    return new NextResponse(JSON.stringify(audioInfo), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (error) {
    console.error('Error fetching audio:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: corsHeaders
  });
}
