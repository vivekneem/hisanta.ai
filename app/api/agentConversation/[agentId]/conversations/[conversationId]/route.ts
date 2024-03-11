import { saveAgentConversation } from '@/lib/storage';
import { FixieClient } from 'fixie';

type RouteSegment = { params: { agentId: string; conversationId: string } };

const client = new FixieClient({ apiKey: process.env.FIXIE_API_KEY, url: process.env.FIXIE_API_URL });

/** Return the given character. */
export async function GET(req: Request, { params }: RouteSegment): Promise<Response> {
  console.log('🚀 ~ GET ~ params:', params);
  try {
    const conversation = await client.getConversation({
      agentId: params.agentId,
      conversationId: params.conversationId,
    });
    console.log('🚀 ~ GET ~ conversation:', conversation);
    return new Response(JSON.stringify(conversation), {
      headers: { 'content-type': 'application/json' },
      status: 200,
    });
  } catch (e) {
    return new Response((e as Error).message, { status: 404 });
  }
}
