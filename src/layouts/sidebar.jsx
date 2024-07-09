import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Hash, Mic, Settings, Video } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  const [activeServer, setActiveServer] = useState(0);

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[70px_240px_1fr_240px]">
      <Sidebar activeServer={activeServer} setActiveServer={setActiveServer} />
      <ChannelList />
      <main className="flex flex-col">
        <ChatHeader />
        <ChatArea />
      </main>
      <UserList />
    </div>
  );
};

const Sidebar = ({ activeServer, setActiveServer }) => (
  <div className="flex flex-col items-center space-y-4 bg-gray-900 py-4">
    {[...Array(5)].map((_, index) => (
      <Button
        key={index}
        size="icon"
        variant={activeServer === index ? "secondary" : "ghost"}
        className="h-12 w-12 rounded-full"
        onClick={() => setActiveServer(index)}
      >
        S{index + 1}
      </Button>
    ))}
    <Button size="icon" variant="outline" className="mt-auto h-12 w-12 rounded-full">
      <Settings className="h-6 w-6" />
    </Button>
  </div>
);

const ChannelList = () => (
  <div className="flex flex-col bg-gray-800">
    <div className="p-4">
      <h2 className="text-lg font-semibold text-white">Server Name</h2>
    </div>
    <ScrollArea className="flex-1">
      <div className="space-y-2 p-2">
        <ChannelSection title="Text Channels" icon={<Hash className="mr-2 h-4 w-4" />} />
        <ChannelSection title="Voice Channels" icon={<Mic className="mr-2 h-4 w-4" />} />
      </div>
    </ScrollArea>
    <UserProfile />
  </div>
);

const ChannelSection = ({ title, icon }) => (
  <div>
    <h3 className="mb-2 px-2 text-sm font-semibold uppercase text-gray-400">{title}</h3>
    <div className="space-y-[2px]">
      {[...Array(3)].map((_, index) => (
        <NavLink
          key={index}
          to="#"
          className={({ isActive }) =>
            cn(
              "flex items-center rounded px-2 py-1 text-gray-400 hover:bg-gray-700 hover:text-gray-100",
              isActive && "bg-gray-700 text-white"
            )
          }
        >
          {icon}
          Channel {index + 1}
        </NavLink>
      ))}
    </div>
  </div>
);

const UserProfile = () => (
  <div className="flex items-center p-4">
    <div className="h-8 w-8 rounded-full bg-gray-600" />
    <div className="ml-2">
      <div className="text-sm font-medium text-white">Username</div>
      <div className="text-xs text-gray-400">Online</div>
    </div>
  </div>
);

const ChatHeader = () => (
  <header className="flex h-12 items-center border-b px-4">
    <h2 className="text-lg font-semibold">Channel Name</h2>
    <Button size="icon" variant="ghost" className="ml-auto">
      <Settings className="h-5 w-5" />
    </Button>
  </header>
);

const ChatArea = () => (
  <div className="flex flex-1 flex-col">
    <ScrollArea className="flex-1 p-4">
      {/* Chat messages will go here */}
    </ScrollArea>
    <div className="p-4">
      <div className="flex items-center rounded-md border bg-white px-3 py-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 bg-transparent outline-none"
        />
        <Button size="sm">Send</Button>
      </div>
    </div>
  </div>
);

const UserList = () => (
  <div className="border-l bg-gray-100">
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <div className="p-4 space-y-4">
        <h3 className="text-sm font-semibold uppercase text-gray-500">Online — 3</h3>
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gray-300" />
            <div>
              <div className="text-sm font-medium">User {index + 1}</div>
              <div className="text-xs text-gray-500">Online</div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  </div>
);

export default Layout;