"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Phone, ImageIcon } from "lucide-react"

// Mock data for chats
const chats = [
  { id: 1, name: "John Farmer", lastMessage: "When can you start?", timestamp: "10:30 AM" },
  { id: 2, name: "Sarah Worker", lastMessage: "I'm available next week", timestamp: "Yesterday" },
  { id: 3, name: "Mike Owner", lastMessage: "The job is still open", timestamp: "2 days ago" },
]

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(chats[0])
  const [message, setMessage] = useState("")

  const sendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 h-screen flex">
      <Card className="w-1/3 mr-4">
        <CardHeader>
          <CardTitle>Recent Conversations</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-200px)]">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`p-4 cursor-pointer hover:bg-gray-100 ${selectedChat.id === chat.id ? "bg-gray-100" : ""}`}
                onClick={() => setSelectedChat(chat)}
              >
                <h3 className="font-semibold">{chat.name}</h3>
                <p className="text-sm text-gray-500">{chat.lastMessage}</p>
                <p className="text-xs text-gray-400">{chat.timestamp}</p>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{selectedChat.name}</span>
            <Button variant="outline" size="icon">
              <Phone className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col h-[calc(100vh-200px)]">
          <ScrollArea className="flex-1 mb-4">{/* Chat messages would go here */}</ScrollArea>
          <div className="flex items-center">
            <Button variant="outline" size="icon" className="mr-2">
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 mr-2"
            />
            <Button onClick={sendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

