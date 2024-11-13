import React from 'react';
import { Clock, MessageSquare } from 'lucide-react';
import { Caption } from '../types';

interface CaptionEditorProps {
  captions: Caption[];
  onCaptionUpdate: (caption: Caption) => void;
  videoRef: React.RefObject<HTMLVideoElement>;
  currentTime?: number;
}

const CaptionEditor: React.FC<CaptionEditorProps> = ({
  captions,
  onCaptionUpdate,
  videoRef,
  currentTime = 0,
}) => {
  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      videoRef.current.play();
    }
  };

  const isActive = (caption: Caption) => {
    return currentTime >= caption.startTime && currentTime <= caption.endTime;
  };

  return (
    <div className="space-y-4">
      {captions.map((caption) => (
        <div
          key={caption.id}
          id={`caption-${caption.id}`}
          className={`bg-white border rounded-lg p-4 transition-all duration-200 cursor-pointer
            ${isActive(caption) 
              ? 'ring-2 ring-[#0072CE] border-[#0072CE]' 
              : 'border-gray-200 hover:border-[#0072CE]'}`}
          onClick={() => handleSeek(caption.startTime)}
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-2 text-sm text-[#0072CE]">
              <Clock className="w-4 h-4" />
              {caption.startTime.toFixed(1)}s - {caption.endTime.toFixed(1)}s
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-500">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">Caption Text</span>
            </div>
            <textarea
              value={caption.text}
              onChange={(e) =>
                onCaptionUpdate({ ...caption, text: e.target.value })
              }
              className="w-full bg-white border border-gray-200 rounded-md p-2 text-gray-900 focus:border-[#0072CE] focus:ring-1 focus:ring-[#0072CE] outline-none"
              rows={2}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CaptionEditor;