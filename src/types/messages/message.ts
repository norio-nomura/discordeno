import { Channel } from "../channels/channel.ts";
import { ChannelMention } from "../channels/channel_mention.ts";
import { ThreadMember } from "../channels/threads/thread_member.ts";
import { Embed } from "../embeds/embed.ts";
import { MessageInteraction } from "../interactions/message_interaction.ts";
import { GuildMember } from "../members/guild_member.ts";
import { Application } from "../applications/application.ts";
import { User } from "../users/user.ts";
import { Attachment } from "./attachment.ts";
import { MessageComponents } from "./components/message_components.ts";
import { MessageActivity } from "./message_activity.ts";
import { MessageReference } from "./message_reference.ts";
import { MessageSticker } from "./message_sticker.ts";
import { DiscordMessageTypes } from "./message_types.ts";
import { Reaction } from "./reaction.ts";
import { MessageStickerItem } from "./message_sticker_item.ts";

/** https://discord.com/developers/docs/resources/channel#message-object */
export interface Message {
  /** id of the message */
  id: string;
  /** id of the channel the message was sent in */
  channelId: string;
  /** id of the guild the message was sent in */
  guildId?: string;
  /**
   * The author of this message (not guaranteed to be a valid user)
   * Note: The author object follows the structure of the user object, but is only a valid user in the case where the message is generated by a user or bot user. If the message is generated by a webhook, the author object corresponds to the webhook's id, username, and avatar. You can tell if a message is generated by a webhook by checking for the webhook_id on the message object.
   */
  author: User;
  /**
   * Member properties for this message's author
   * Note: The member object exists in `MESSAGE_CREATE` and `MESSAGE_UPDATE` events from text-based guild channels. This allows bots to obtain real-time member data without requiring bots to store member state in memory.
   */
  member?: GuildMember;
  /** Contents of the message */
  content?: string;
  /** When this message was sent */
  timestamp: string;
  /** When this message was edited (or null if never) */
  editedTimestamp: string | null;
  /** Whether this was a TTS message */
  tts: boolean;
  /** Whether this message mentions everyone */
  mentionEveryone: boolean;
  /**
   * Users specifically mentioned in the message
   * Note: The user objects in the mentions array will only have the partial member field present in `MESSAGE_CREATE` and `MESSAGE_UPDATE` events from text-based guild channels.
   */
  mentions?: (User & { member?: Partial<GuildMember> })[];
  /** Roles specifically mentioned in this message */
  mentionRoles?: string[];
  /**
   * Channels specifically mentioned in this message
   * Note: Not all channel mentions in a message will appear in `mention_channels`. Only textual channels that are visible to everyone in a lurkable guild will ever be included. Only crossposted messages (via Channel Following) currently include `mention_channels` at all. If no mentions in the message meet these requirements, this field will not be sent.
   */
  mentionChannels?: ChannelMention[];
  /** Any attached files */
  attachments: Attachment[];
  /** Any embedded content */
  embeds: Embed[];
  /** Reactions to the message */
  reactions?: Reaction[];
  /** Used for validating a message was sent */
  nonce?: number | string;
  /** Whether this message is pinned */
  pinned: boolean;
  /** If the message is generated by a webhook, this is the webhook's id */
  webhookId?: string;
  /** Type of message */
  type: DiscordMessageTypes;
  /** Sent with Rich Presence-related chat embeds */
  activity?: MessageActivity;
  /** Sent with Rich Presence-related chat embeds */
  application?: Partial<Application>;
  /** If the message is a response to an Interaction, this is the id of the interaction's application */
  applicationId?: string;
  /** Data showing the source of a crossposted channel follow add, pin or reply message */
  messageReference?: Omit<MessageReference, "failIfNotExists">;
  /** Message flags combined as a bitfield */
  flags?: number;
  /**
   * The stickers sent with the message (bots currently can only receive messages with stickers, not send)
   * @deprecated
   */
  stickers?: MessageSticker[];
  /**
   * The message associated with the `message_reference`
   * Note: This field is only returned for messages with a `type` of `19` (REPLY). If the message is a reply but the `referenced_message` field is not present, the backend did not attempt to fetch the message that was being replied to, so its state is unknown. If the field exists but is null, the referenced message was deleted.
   */
  referencedMessage?: Message;
  /** Sent if the message is a response to an Interaction */
  interaction?: MessageInteraction;
  /** The thread that was started from this message, includes thread member object */
  thread?: Omit<Channel, "member"> & { member: ThreadMember };
  /** The components related to this message */
  components?: MessageComponents;
  /** Sent if the message contains stickers */
  stickerItems?: MessageStickerItem[];
}
