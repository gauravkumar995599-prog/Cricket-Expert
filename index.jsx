import React, { useState } from "react";
import {
  ArrowLeft,
  Phone,
  Video,
  MoreVertical,
  Send,
  Smile,
  Paperclip,
  Mic,
  Check,
  CheckCheck,
  Camera,
  MessageCircle,
  Users,
  Settings,
} from "lucide-react";

const PALETTE = [
  { bg: "#FF5A5F", text: "#fff" }, // coral
  { bg: "#FFB020", text: "#3A2200" }, // amber
  { bg: "#7C5CFF", text: "#fff" }, // violet
  { bg: "#17C3B2", text: "#fff" }, // teal
  { bg: "#FF6FA5", text: "#fff" }, // pink
  { bg: "#3AAED8", text: "#fff" }, // sky
];

const STORY_GRADIENT = "linear-gradient(135deg, #FF5A5F 0%, #FFB020 45%, #7C5CFF 100%)";

const CONTACTS = [
  { id: 1, name: "Priya Sharma", initials: "PS", hasStory: true, viewed: false },
  { id: 2, name: "Marcus Chen", initials: "MC", hasStory: true, viewed: false },
  { id: 3, name: "Family Group", initials: "FG", hasStory: false, viewed: false },
  { id: 4, name: "Aisha Bello", initials: "AB", hasStory: true, viewed: true },
  { id: 5, name: "Diego Ruiz", initials: "DR", hasStory: false, viewed: false },
  { id: 6, name: "Yuki Tanaka", initials: "YT", hasStory: true, viewed: true },
];

const CHATS = [
  {
    id: 1,
    contactId: 1,
    lastMessage: "See you at 6, don't be late this time",
    time: "12:41",
    unread: 2,
    messages: [
      { id: 1, from: "them", text: "Hey! Are we still on for tonight?", time: "12:30" },
      { id: 2, from: "me", text: "Yes! Just finishing up work", time: "12:33", status: "read" },
      { id: 3, from: "them", text: "See you at 6, don't be late this time", time: "12:41" },
    ],
  },
  {
    id: 2,
    contactId: 2,
    lastMessage: "Sent the files over, check your email",
    time: "11:15",
    unread: 0,
    messages: [
      { id: 1, from: "them", text: "Sent the files over, check your email", time: "11:15" },
      { id: 2, from: "me", text: "Got them, thanks!", time: "11:20", status: "read" },
    ],
  },
  {
    id: 3,
    contactId: 3,
    lastMessage: "Mom: dinner is at 7 this sunday",
    time: "Yesterday",
    unread: 5,
    messages: [
      { id: 1, from: "them", text: "Dinner is at 7 this sunday", time: "Yesterday" },
    ],
  },
  {
    id: 4,
    contactId: 4,
    lastMessage: "Haha that's hilarious",
    time: "Yesterday",
    unread: 0,
    messages: [
      { id: 1, from: "me", text: "You won't believe what happened today", time: "Yesterday", status: "read" },
      { id: 2, from: "them", text: "Haha that's hilarious", time: "Yesterday" },
    ],
  },
  {
    id: 5,
    contactId: 5,
    lastMessage: "Let's catch up soon",
    time: "Mon",
    unread: 0,
    messages: [{ id: 1, from: "them", text: "Let's catch up soon", time: "Mon" }],
  },
];

function colorFor(contactId) {
  return PALETTE[contactId % PALETTE.length];
}

function Avatar({ contact, size = 52 }) {
  const c = colorFor(contact.id);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: c.bg,
        color: c.text,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        fontSize: size * 0.36,
        flexShrink: 0,
      }}
    >
      {contact.initials}
    </div>
  );
}

function StoryRing({ contact, onClick }) {
  const showRing = contact.hasStory && !contact.viewed;
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        width: 68,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 62,
          height: 62,
          borderRadius: "50%",
          background: showRing ? STORY_GRADIENT : contact.hasStory ? "#D8D3C9" : "transparent",
          padding: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "#FBF9F6",
            padding: contact.hasStory ? 2 : 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar contact={contact} size={contact.hasStory ? 52 : 56} />
        </div>
      </div>
      <span
        style={{
          fontSize: 11.5,
          color: "#3A3A3A",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: 66,
        }}
      >
        {contact.id === 999 ? "Your story" : contact.name.split(" ")[0]}
      </span>
    </button>
  );
}

function ChatListScreen({ onOpenChat, onOpenStory }) {
  const me = { id: 999, name: "You", initials: "ME", hasStory: false, viewed: false };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(120deg, #7C5CFF, #FF5A5F)",
          padding: "18px 16px 14px",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 22, fontWeight: 700 }}>Chatterbox</span>
          <div style={{ display: "flex", gap: 18 }}>
            <Camera size={22} />
            <MoreVertical size={22} />
          </div>
        </div>
      </div>

      {/* Stories row */}
      <div
        style={{
          display: "flex",
          gap: 4,
          padding: "14px 12px",
          overflowX: "auto",
          borderBottom: "1px solid #ECE7DD",
          background: "#FBF9F6",
        }}
      >
        <div style={{ position: "relative" }}>
          <StoryRing contact={me} onClick={() => onOpenStory(me)} />
          <div
            style={{
              position: "absolute",
              bottom: 20,
              right: 6,
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#7C5CFF",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 700,
              border: "2px solid #FBF9F6",
            }}
          >
            +
          </div>
        </div>
        {CONTACTS.filter((c) => c.hasStory).map((c) => (
          <StoryRing key={c.id} contact={c} onClick={() => onOpenStory(c)} />
        ))}
      </div>

      {/* Chat list */}
      <div style={{ flex: 1, overflowY: "auto", background: "#FBF9F6" }}>
        {CHATS.map((chat) => {
          const contact = CONTACTS.find((c) => c.id === chat.contactId);
          return (
            <button
              key={chat.id}
              onClick={() => onOpenChat(chat)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 16px",
                background: "none",
                border: "none",
                borderBottom: "1px solid #F1EDE4",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <Avatar contact={contact} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 600, fontSize: 15.5, color: "#2B2B2B" }}>
                    {contact.name}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: chat.unread ? "#17C3B2" : "#8A8A8A",
                      fontWeight: chat.unread ? 600 : 400,
                    }}
                  >
                    {chat.time}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                  <span
                    style={{
                      fontSize: 13.5,
                      color: "#8A8A8A",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: 220,
                    }}
                  >
                    {chat.lastMessage}
                  </span>
                  {chat.unread > 0 && (
                    <span
                      style={{
                        background: colorFor(contact.id).bg,
                        color: colorFor(contact.id).text,
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 700,
                        minWidth: 20,
                        height: 20,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0 6px",
                      }}
                    >
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom nav */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "10px 0",
          borderTop: "1px solid #ECE7DD",
          background: "#fff",
        }}
      >
        {[
          { icon: MessageCircle, label: "Chats", active: true, color: "#17C3B2" },
          { icon: Users, label: "Groups", active: false, color: "#8A8A8A" },
          { icon: Settings, label: "Settings", active: false, color: "#8A8A8A" },
        ].map(({ icon: Icon, label, active, color }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Icon size={22} color={color} fill={active ? color : "none"} />
            <span style={{ fontSize: 11, color, fontWeight: active ? 600 : 400 }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatThreadScreen({ chat, onBack }) {
  const [messages, setMessages] = useState(chat.messages);
  const [draft, setDraft] = useState("");
  const contact = CONTACTS.find((c) => c.id === chat.contactId);
  const accent = colorFor(contact.id).bg;

  const send = () => {
    if (!draft.trim()) return;
    setMessages((m) => [
      ...m,
      { id: m.length + 1, from: "me", text: draft.trim(), time: "now", status: "sent" },
    ]);
    setDraft("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div
        style={{
          background: accent,
          padding: "14px 12px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: "#fff",
        }}
      >
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff" }} aria-label="Back">
          <ArrowLeft size={22} />
        </button>
        <Avatar contact={contact} size={38} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 15.5 }}>{contact.name}</div>
          <div style={{ fontSize: 12, opacity: 0.85 }}>online</div>
        </div>
        <Video size={20} style={{ marginRight: 14 }} />
        <Phone size={19} />
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "14px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          background:
            "repeating-linear-gradient(135deg, #FBF9F6 0 40px, #F5F1E8 40px 80px)",
        }}
      >
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              alignSelf: m.from === "me" ? "flex-end" : "flex-start",
              maxWidth: "75%",
              background: m.from === "me" ? "#17C3B2" : "#EDE7FF",
              color: m.from === "me" ? "#fff" : "#3B2E7E",
              padding: "8px 12px",
              borderRadius: 14,
              borderBottomRightRadius: m.from === "me" ? 3 : 14,
              borderBottomLeftRadius: m.from === "me" ? 14 : 3,
              fontSize: 14.5,
              lineHeight: 1.4,
            }}
          >
            {m.text}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 4,
                marginTop: 3,
                fontSize: 10.5,
                opacity: 0.8,
              }}
            >
              {m.time}
              {m.from === "me" &&
                (m.status === "read" ? <CheckCheck size={13} /> : <Check size={13} />)}
            </div>
          </div>
        ))}
      </div>

      {/* Composer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 12px",
          background: "#fff",
          borderTop: "1px solid #ECE7DD",
        }}
      >
        <Smile size={22} color="#8A8A8A" />
        <Paperclip size={20} color="#8A8A8A" />
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Message"
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "#F1EDE4",
            borderRadius: 20,
            padding: "9px 14px",
            fontSize: 14.5,
          }}
        />
        <button
          onClick={send}
          style={{
            background: accent,
            border: "none",
            borderRadius: "50%",
            width: 38,
            height: 38,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#fff",
          }}
          aria-label="Send"
        >
          {draft.trim() ? <Send size={17} /> : <Mic size={17} />}
        </button>
      </div>
    </div>
  );
}

function StoryViewer({ contact, onClose }) {
  const c = colorFor(contact.id === 999 ? 3 : contact.id);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: c.bg,
        display: "flex",
        flexDirection: "column",
        color: "#fff",
      }}
    >
      <div style={{ display: "flex", gap: 4, padding: "10px 10px 0" }}>
        <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.9)", borderRadius: 2 }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px" }}>
        <Avatar contact={contact} size={34} />
        <span style={{ fontWeight: 600, fontSize: 14.5 }}>{contact.name}</span>
        <span style={{ fontSize: 12, opacity: 0.85 }}>2h</span>
        <div style={{ flex: 1 }} />
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer" }} aria-label="Close">
          ×
        </button>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 40, fontWeight: 700, opacity: 0.9 }}>{contact.initials}</span>
      </div>
      <div style={{ padding: 14, display: "flex", gap: 10 }}>
        <input
          placeholder="Reply..."
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.2)",
            border: "1px solid rgba(255,255,255,0.5)",
            borderRadius: 20,
            padding: "9px 14px",
            color: "#fff",
            outline: "none",
          }}
        />
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState({ name: "list" });

  return (
    <div
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
        maxWidth: 420,
        margin: "0 auto",
        height: "100vh",
        maxHeight: 780,
        position: "relative",
        overflow: "hidden",
        border: "1px solid #ECE7DD",
        borderRadius: 12,
      }}
    >
      {screen.name === "list" && (
        <ChatListScreen
          onOpenChat={(chat) => setScreen({ name: "chat", chat })}
          onOpenStory={(contact) => setScreen({ name: "story", contact })}
        />
      )}
      {screen.name === "chat" && (
        <ChatThreadScreen chat={screen.chat} onBack={() => setScreen({ name: "list" })} />
      )}
      {screen.name === "story" && (
        <StoryViewer contact={screen.contact} onClose={() => setScreen({ name: "list" })} />
      )}
    </div>
  );
}
