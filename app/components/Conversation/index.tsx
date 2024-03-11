import Image from 'next/image';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface Message {
  kind: string;
  content: string;
  state: string;
  metadata: object;
}

interface Turn {
  id: string;
  timestamp: string;
  role: 'user' | 'assistant';
  messages: Message[];
  generationParams: any;
  state: 'in-progress' | 'done' | 'stopped' | 'error';
  errorDetail: string;
  inReplyToId?: string;
}

export interface Conversation {
  id: string;
  turns: Turn[];
}

interface Props {
  conversation: Conversation;
}

const ConversationBlock: React.FC<Props> = ({ conversation }) => {
  return (
    <div>
      {conversation?.turns.map((turn) => (
        <div key={turn.id}>
          {turn.messages.map((message) => {
            const date = new Date(turn.timestamp);
            const localizedDateString = date.toLocaleString();
            return (
              <div key={message.kind} className="flex flex-col w-full space-y-2 bg-white">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src={`/images/${turn.role}.svg`} alt={turn.role} />
                    <AvatarFallback>{turn.role[0]}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-0.5 text-xs">
                    <div className="flex items-center space-x-1">
                      <h6 className="font-medium leading-none">{turn.role}</h6>
                      <time className="text-gray-500 dark:text-gray-400">{localizedDateString}</time>
                    </div>
                    <p className="text-sm leading-6">{message.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ConversationBlock;
