import List from "@mui/material/List";
import { useAtom } from "jotai";

import { messagesAtom } from "~/atom/chat";
import ChatConversationListItem from "~/components/atomic/ChatConversationListItem";
import ChatConversationEmptyState from "~/components/molecule/EmptyState/chatConversation";

export default function ChatConversationContent() {
  const [messages] = useAtom(messagesAtom);

  if (typeof messages === "undefined") return <ChatConversationEmptyState />;

  return (
    <List disablePadding>
      {messages.map((message) => (
        <ChatConversationListItem
          key={message.name}
          id={message.id}
          name={message.name}
          text={message.text}
          unread={message.unread}
          time={message.time}
        />
      ))}
    </List>
  );
}
