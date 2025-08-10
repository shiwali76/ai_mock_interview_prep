import React from 'react';
import Image from 'next/image';
import { cn } from "@/lib/utils";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",  // Note: There's a typo here ("ACTIVE" instead of "ACTIVE")
  FINISHED = "FINISHED",
}

const Agent = ({ userName }: { userName: string }) => {
  const isSpeaking = true;
  const callStatus = CallStatus.FINISHED; // Changed to ACTIVE to show End button
  const handleCall = () => {};
  const messages = [
    "Whats your name ?",
    "My name is Jhon Doe, nice to meet you!"
  ];
  const lastMessage = messages[messages.length-1];

  return (
    <>
      <div className="call-view" style={{ minHeight: '200px' }}>
        <div className="card-interviewer p-4">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="profile-image"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="profile-image"
              width={540}
              height={540}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>
      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}
      
      <div className="w-full flex justify-center">
        {callStatus !== CallStatus.ACTIVE ? (
          <button className="relative btn-call">
            <span 
            className={cn(
              "absolute animate-ping rounded-full opacity-75",
              callStatus !== "CONNECTING" && "hidden"
              )}
              />
              <span>
                {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : ". . ."}

              </span>
            
          </button>
        ) : (
          <button className="btn-disconnect">
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;