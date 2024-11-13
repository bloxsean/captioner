import React, { forwardRef } from 'react';
import { Caption } from '../types';

interface VideoPlayerProps {
  src: string;
  captions: Caption[];
  onTimeUpdate?: (currentTime: number) => void;
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ src, captions, onTimeUpdate }, ref) => {
    const getCurrentCaptions = (currentTime: number) => {
      return captions.filter(
        caption => currentTime >= caption.startTime && currentTime <= caption.endTime
      );
    };

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const video = e.currentTarget;
      const currentCaptions = getCurrentCaptions(video.currentTime);
      const captionContainer = document.getElementById('caption-container');
      
      if (captionContainer) {
        captionContainer.innerHTML = currentCaptions
          .map(caption => caption.text)
          .join('<br>');
      }

      onTimeUpdate?.(video.currentTime);
    };

    return (
      <div className="relative aspect-video">
        <video
          ref={ref}
          src={src}
          className="w-full h-full"
          controls
          onTimeUpdate={handleTimeUpdate}
        />
        <div
          id="caption-container"
          className="absolute bottom-16 left-0 right-0 text-center text-white text-lg font-semibold px-4 py-2 bg-black/50"
        />
      </div>
    );
  }
);

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;