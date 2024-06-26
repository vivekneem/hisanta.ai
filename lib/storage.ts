import { kv } from '@vercel/kv';
import { put, head } from '@vercel/blob';
import { CharacterType, AgentToCharacterData, AgentConversationData } from '@/lib/types';
import { Uuid } from 'uuid-tool';
import fs from 'fs';

/** Load the given Character from KV. */
export async function loadCharacter(characterId: string): Promise<CharacterType> {
  const character = await kv.json.get(`character:${characterId}`, '$');
  if (character === null) {
    throw new Error(`Character ${characterId} not found`);
  }
  return (character as CharacterType[])[0];
}

/** Store the given Character to KV. */
export async function saveCharacter(character: CharacterType, owner?: string): Promise<void> {
  await kv.json.set(`character:${character.characterId}`, '$', character);
  if (owner) {
    await kv.json.set(`user:${owner}:${character.characterId}`, '$', character);
  }
}

export async function loadAgentConversation(agentId: string, conversationId: string): Promise<any> {
  const getAgentConvo = await kv.json.get(`agentConversation:${agentId}:${conversationId}`, '$');
  console.log('getAgentConvo:', getAgentConvo);
  if (getAgentConvo === null) {
    throw new Error(`Character ${agentId} or ${conversationId} not found`);
  }
  return getAgentConvo;
}

/** Store the given Character to KV. */
export async function saveAgentConversation(
  data: AgentConversationData,
  agentId: string,
  conversationId: string
): Promise<void> {
  await kv.json.set(`agentConversation:${agentId}:${conversationId}`, '$', data);
}

/** Load the Character Data mapped to the given Agent ID from KV. */
export async function loadCharacterByAgentId(agentId: string): Promise<AgentToCharacterData> {
  const characterData = await kv.json.get(`agent:${agentId}`);
  if (!characterData) {
    throw new Error(`Character data not found for Agent ${agentId}`);
  }

  try {
    return characterData as AgentToCharacterData;
  } catch (error: any) {
    // Handle JSON parsing errors
    throw new Error(`Error parsing character data for Agent ${agentId}: ${error.message}`);
  }
}

/** Return the list of characterIds owned by the given user. */
export async function listCharacterIds(owner: string): Promise<string[]> {
  let characterIds: string[] = [];
  let cursor = 0;
  do {
    const chars = await kv.scan(cursor, { match: `user:${owner}:*` });
    cursor = chars[0];
    const keys = chars[1];
    keys.map((key: string) => {
      // Strip the "user:owner:" prefix.
      key = key.substring(5 + owner.length + 1);
      characterIds.push(key);
    });
  } while (cursor !== 0);

  return characterIds;
}

/** Store the mapping of Agent ID to Character Data to KV. */
export async function saveAgentCharacterMapping(
  agentId: string,
  templateId: string,
  imageBlob: string | null
): Promise<AgentToCharacterData> {
  const uuid = new Uuid().toString();

  let characterData = {
    templateId: templateId,
    generatedImageURL: '',
  };
  if (imageBlob) {
    // Create an object with the templateId and generatedImage
    const imageBuffer = Buffer.from(imageBlob.split(',')[1], 'base64');
    const { url } = await put(uuid, imageBuffer, { access: 'public' });
    characterData = {
      templateId: templateId,
      generatedImageURL: url,
    };
  }

  // Save this object in your key-value store with the agent's ID as the key
  await kv.json.set(`agent:${agentId}`, '$', characterData);
  return characterData;
}
