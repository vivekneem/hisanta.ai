import { CallTranscript } from '../../../../../components/CallTranscript';

// Set the runtime to Edge.
// @see https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes#segment-runtime-option
//export const runtime = 'edge';

// Enable dynamic routes.
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true;

// Set the revalidation period.
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = 60;

/** Build character page. */
export default async function Page({ params }: { params: { agentId: string; conversationId: string } }) {
  return (
    <div className="mx-auto flex bg-white flex-col w-full mt-4 build-character-background">
      <div className="text-center text-black mx-auto p-4 text-2xl">Here is your call transcript</div>
      <CallTranscript agentId={params.agentId} conversationId={params.conversationId} />
    </div>
  );
}
