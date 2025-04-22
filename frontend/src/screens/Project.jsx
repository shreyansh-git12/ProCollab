// your imports remain unchanged
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { PiUsersFill } from "react-icons/pi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AddUser from "../components/AddUser";
import axiosInstance from "@/config/axios";
import { initSocket, receiveMessage, sendMessage } from "../config/socket";
import Loading from "../components/Loading.jsx";
import Markdown from "markdown-to-jsx";
import hljs from "highlight.js";

function SyntaxHighlightedCode(props) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && props.className?.includes("lang-") && window.hljs) {
      window.hljs.highlightElement(ref.current);
      ref.current.removeAttribute("data-highlighted");
    }
  }, [props.className, props.children]);
  return (
    <pre
      style={{
        overflowX: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      className="no-scrollbar"
    >
      <code
        {...props}
        ref={ref}
        style={{ display: "block", minWidth: "fit-content" }}
      />
    </pre>
  );
}

const formatAIMessage = (data) => {
  try {
    const jsonString = data?.message
      ?.replace(/^```json\n/, "")
      .replace(/\n```$/, "");
    if (jsonString) {
      const parsed = JSON.parse(jsonString);
      return parsed?.message || data?.message || "No AI message found.";
    }
    return data?.message || "Invalid AI response format.";
  } catch (error) {
    return data?.message || "Invalid AI response format.";
  }
};

const Project = () => {
  const { id: projectId } = useParams();
  const [collaborators, setCollaborators] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [awaitingAI, setAwaitingAI] = useState(false);
  const chatContainerRef = useRef(null);
  const [fileTree, setFileTree] = useState({});
  const [openedFiles, setOpenedFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);

  const sendMessageHandler = () => {
    if (!message || !user) return;
    const outgoingMessage = { message, sender: user._id, email: user.email };
    sendMessage("project-message", outgoingMessage);
    setMessages((prev) => [...prev, outgoingMessage]);
    setMessage("");
    if (message.startsWith("@ai")) setAwaitingAI(true);
  };

  useEffect(() => {
    let socketInitialized = false;
    const fetchUserAndSetupSocket = async () => {
      try {
        console.log("useEffect - fetchUserAndSetupSocket: Starting");
        const res = await axiosInstance.get("/user/profile");
        const fetchedUser = res.data.user;
        setUser(fetchedUser);
        console.log(
          "useEffect - fetchUserAndSetupSocket: User fetched:",
          fetchedUser
        );

        if (projectId && !socketInitialized) {
          console.log(
            "useEffect - fetchUserAndSetupSocket: projectId is",
            projectId,
            "and socket not initialized. Initializing socket."
          );
          initSocket(projectId);
          socketInitialized = true;
          console.log(
            "useEffect - fetchUserAndSetupSocket: Socket initialized."
          );

          receiveMessage("project-message", (data) => {
            console.log("--- receiveMessage 'project-message' triggered ---");
            console.log("receiveMessage - Full data object:", data);
            console.log("receiveMessage - data.email:", data?.email);
            console.log("receiveMessage - data.message (raw):", data?.message);

            const formattedMessage = {
              ...data,
              message:
                data?.email === "@ai" ? formatAIMessage(data) : data?.message,
            };
            setMessages((prev) => [...prev, formattedMessage]);
            console.log("receiveMessage - messages state updated:", messages);

            if (data?.email === "@ai") {
              console.log("receiveMessage - Message is from AI");
              setAwaitingAI(false);
              console.log("receiveMessage - awaitingAI set to false");

              try {
                // Extract JSON from markdown code block
                const jsonMatch = data.message.match(/```json\n([\s\S]*)\n```/);
                let jsonString = data.message;
                if (jsonMatch && jsonMatch[1]) {
                  jsonString = jsonMatch[1];
                }

                const parsedData = JSON.parse(jsonString);
                const aiFileTree = parsedData?.fileTree;

                console.log("receiveMessage - Parsed AI response:", parsedData);
                console.log(
                  "receiveMessage - Extracted aiFileTree:",
                  aiFileTree
                );

                if (aiFileTree) {
                  setFileTree(aiFileTree);
                  console.log(
                    "receiveMessage - After setFileTree, fileTree state:",
                    fileTree // Make sure this log is *after* setFileTree
                  );
                  if (Object.keys(aiFileTree).length > 0) {
                    openFile(Object.keys(aiFileTree)[0]);
                  }
                } else {
                  console.log(
                    "receiveMessage - aiFileTree is falsy or undefined in parsed data."
                  );
                }
              } catch (error) {
                console.error(
                  "receiveMessage - Error processing AI message:",
                  error
                );
              }
            } else {
              console.log(
                "receiveMessage - Message not from AI, skipping fileTree logic"
              );
            }
          });
        } else if (projectId && socketInitialized) {
          console.log(
            "useEffect - fetchUserAndSetupSocket: projectId is",
            projectId,
            "and socket is already initialized."
          );
        } else {
          console.log(
            "useEffect - fetchUserAndSetupSocket: projectId is null or undefined, or socket not initialized yet."
          );
        }
      } catch (error) {
        console.error(
          "useEffect - fetchUserAndSetupSocket: Error fetching user:",
          error
        );
      }
    };

    const fetchCollaborators = async () => {
      try {
        console.log("useEffect - fetchCollaborators: Starting");
        const res = await axiosInstance.get(
          `/project/get-project/${projectId}`
        );
        const fetchedCollaborators = res.data.project.users || [];
        setCollaborators(fetchedCollaborators);
        console.log(
          "useEffect - fetchCollaborators: Collaborators fetched:",
          fetchedCollaborators
        );
      } catch (error) {
        console.error(
          "useEffect - fetchCollaborators: Error fetching collaborators:",
          error
        );
      }
    };

    fetchUserAndSetupSocket();
    fetchCollaborators();

    return () => {
      console.log(
        "useEffect - Cleanup: Unsubscribing from 'project-message' if socket exists."
      );
      if (window.socketInstance) window.socketInstance.off("project-message");
    };
  }, [projectId]);

  useEffect(() => {
    console.log(
      "useEffect - chatContainerRef scroll effect triggered. messages length:",
      messages.length
    );
    if (chatContainerRef.current) {
      console.log(
        "useEffect - chatContainerRef scroll effect: Scrolling to bottom"
      );
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    } else {
      console.log(
        "useEffect - chatContainerRef scroll effect: chatContainerRef.current is null."
      );
    }
  }, [messages]);

  const openFile = (fileName) => {
    console.log("openFile: Attempting to open file:", fileName);
    if (!openedFiles.includes(fileName)) {
      setOpenedFiles((prev) => {
        const updatedOpenedFiles = [...prev, fileName];
        console.log(
          "openFile: File not opened, updated openedFiles:",
          updatedOpenedFiles
        );
        return updatedOpenedFiles;
      });
    } else {
      console.log("openFile: File already opened:", fileName);
    }
    setCurrentFile(fileName);
    console.log("openFile: currentFile set to:", fileName);
  };

  const closeFile = (fileName) => {
    console.log("closeFile: Attempting to close file:", fileName);
    setOpenedFiles((prev) => {
      const updatedOpenedFiles = prev.filter((f) => f !== fileName);
      console.log("closeFile: updated openedFiles:", updatedOpenedFiles);
      return updatedOpenedFiles;
    });
    if (currentFile === fileName) {
      setCurrentFile(null);
      console.log(
        "closeFile: currentFile set to null as closed file was current."
      );
    } else {
      console.log(
        "closeFile: currentFile not changed as closed file was not current."
      );
    }
  };

  return (
    <TooltipProvider>
      <div className="h-screen w-screen flex bg-background text-foreground">
        <section className="h-full w-[350px] bg-background border-r flex flex-col justify-between relative">
          <header className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Project Chat</h2>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Sheet>
                    <SheetTrigger asChild>
                      <button className="p-2 rounded-full border hover:bg-muted">
                        <PiUsersFill size={20} />
                      </button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[350px]">
                      <SheetHeader>
                        <SheetTitle>Collaborators</SheetTitle>
                        <SheetDescription>
                          People working on this project.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-6 space-y-4 px-7">
                        {collaborators.map((user) => (
                          <div
                            key={user._id}
                            className="flex items-center gap-4"
                          >
                            <Avatar>
                              <AvatarFallback>
                                {user.email?.charAt(0).toUpperCase() || "?"}
                              </AvatarFallback>
                            </Avatar>
                            <p className="text-sm text-muted-foreground">
                              {user.email || "No email"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </SheetContent>
                  </Sheet>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Collaborators</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="p-2 rounded-full border hover:bg-muted">
                    <AddUser projectId={projectId} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add Collaborator</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </header>

          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 no-scrollbar"
          >
            {messages.map((msg, index) => {
              const isMe = msg.email === user?.email;
              return (
                <div
                  key={index}
                  className={`flex flex-col max-w-[80%] ${
                    isMe ? "self-end items-end" : "self-start items-start"
                  }`}
                >
                  <span className="text-[11px] text-muted-foreground mb-1">
                    {msg.email || "Unknown"}
                  </span>
                  <div
                    className={`flex items-start gap-2 ${
                      isMe ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Avatar className="h-7 w-7">
                      <AvatarFallback>
                        {msg.email?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`px-4 py-2 rounded-xl text-sm max-w-xs ${
                        isMe
                          ? "bg-primary text-primary-foreground"
                          : msg.email === "@ai"
                          ? "bg-gray-900 text-white w-[265px]"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <Markdown
                        options={{
                          overrides: {
                            code: { component: SyntaxHighlightedCode },
                          },
                        }}
                      >
                        {msg.message}
                      </Markdown>
                    </div>
                  </div>
                </div>
              );
            })}
            {awaitingAI && (
              <div className="sticky bottom-5 w-full flex justify-center items-center mt-5">
                <Loading />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 p-4 border-t">
            <Input
              placeholder="Type your message..."
              className="flex-1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="default" onClick={sendMessageHandler}>
              Send
            </Button>
          </div>
        </section>

        <section className="flex flex-grow h-full">
          <section className="right bg-background flex-grow h-full max-w-54 p-2">
            <h2 className="text-xl font-bold mb-4 text-center border-b pb-2">
              Project Files
            </h2>
            <div className="file-tree flex flex-col gap-2">
              {Object.entries(fileTree).map(([fileName], index) => (
                <button
                  key={fileName}
                  className={`tree-element p-3 flex items-center gap-2 w-full cursor-pointer rounded-lg shadow-sm ${
                    index % 2 === 0 ? "bg-slate-200" : "bg-slate-300"
                  } hover:scale-[1.02] transition-transform`}
                  onClick={() => openFile(fileName)}
                >
                  <p className="font-semibold text-base">{fileName}</p>
                </button>
              ))}
            </div>
          </section>

          <main className="flex-1 bg-background p-6 overflow-y-auto">
            {openedFiles.length > 0 && (
              <div className="flex gap-2 mb-4 border-b pb-2">
                {openedFiles.map((file) => (
                  <div
                    key={file}
                    className={`px-3 py-1 rounded-md bg-muted flex items-center gap-2 cursor-pointer ${
                      file === currentFile
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                    onClick={() => setCurrentFile(file)}
                  >
                    <span>{file}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        closeFile(file);
                      }}
                      className="text-sm ml-1 text-red-600"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}

            {currentFile ? (
              <textarea
                className="w-full h-full p-4 resize-none focus:outline-none focus:ring-0 border-none bg-gray-900 text-white "
                value={fileTree[currentFile]?.content}
                onChange={(e) =>
                  setFileTree((prev) => ({
                    ...prev,
                    [currentFile]: { content: e.target.value },
                  }))
                }
              />
            ) : (
              <p className="text-center text-gray-500">
                Select a file to view.
              </p>
            )}
          </main>
        </section>
      </div>
    </TooltipProvider>
  );
};

export default Project;
