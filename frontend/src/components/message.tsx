interface MessageProps {
  senderName: string;
  text: string;
}

export function Message({senderName, text}: MessageProps) {
  return (
    <div className="inline-block max-w-[80%] m-2">
      <div className="bg-black text-white rounded-2xl px-4 py-2">
        <div className="text-sm font-semibold">
          {senderName}
        </div>
        <div className="pb-1">
          {text}
        </div>
      </div>
    </div>
  )
}