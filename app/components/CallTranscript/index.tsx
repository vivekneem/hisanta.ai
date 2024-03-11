'use client';

import { useEffect, useState } from 'react';
import ConversationBlock, { Conversation } from '../Conversation';

export function CallTranscript({
  agentId,
  duration,
  conversationId,
  roomName,
}: {
  agentId: string;
  duration?: number;
  conversationId?: string;
  roomName?: string;
}) {
  const [conversationData, setConversationData] = useState<Conversation>();

  useEffect(() => {
    fetch(`/api/agentConversation/${agentId}/conversations/${conversationId}`, {
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setConversationData(data);
        } else {
          console.log('Error creating character: ' + data);
        }
      })
      .catch((err) => {
        console.log('Error creating character: ', err);
      });
  }, []);

  return (
    <div className="mx-auto w-full flex flex-col p-8 gap-4">
      <ConversationBlock conversation={conversationData!} />
    </div>
  );
}
