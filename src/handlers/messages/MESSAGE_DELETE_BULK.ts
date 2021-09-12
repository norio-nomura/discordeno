import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { MessageDeleteBulk } from "../../types/messages/message_delete_bulk.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";

export async function handleMessageDeleteBulk(data: DiscordGatewayPayload) {
  const payload = data.d as MessageDeleteBulk;
  const channelId = payload.channelId;
  const channel = await cacheHandlers.get("channels", snowflakeToBigint(payload.channelId));

  return Promise.all(
    payload.ids.map(async (id) => {
      eventHandlers.messageDelete?.({ id, channelId }, await cacheHandlers.get("messages", snowflakeToBigint(id)), channel);
      await cacheHandlers.delete("messages", snowflakeToBigint(id));
    })
  );
}
