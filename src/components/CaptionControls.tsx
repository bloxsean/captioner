import React from 'react';
import { Upload, Wand2 } from 'lucide-react';
import { Caption } from '../types';

interface CaptionControlsProps {
  onCaptionsUpload: (captions: Caption[]) => void;
  onAutoGenerate: () => void;
  isGenerating: boolean;
}

const CaptionControls: React.FC<CaptionControlsProps> = ({
  onCaptionsUpload,
  onAutoGenerate,
  isGenerating
}) => {
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const captions = parseSRTFile(text);
      onCaptionsUpload(captions);
    } catch (error) {
      console.error('Error parsing caption file:', error);
      alert('Invalid caption file format. Please upload a valid SRT file.');
    }
  };

  const parseSRTFile = (content: string): Caption[] => {
    const blocks = content.trim().split('\n\n');
    return blocks.map((block, index) => {
      const lines = block.split('\n');
      const times = lines[1].split(' --> ');
      const text = lines.slice(2).join(' ');
      
      return {
        id: index + 1,
        startTime: timeToSeconds(times[0]),
        endTime: timeToSeconds(times[1]),
        text: text.trim()
      };
    });
  };

  const timeToSeconds = (timeStr: string): number => {
    const [hours, minutes, seconds] = timeStr.split(':');
    const [secs, ms] = seconds.split(',');
    return parseInt(hours) * 3600 + 
           parseInt(minutes) * 60 + 
           parseInt(secs) + 
           parseInt(ms) / 1000;
  };

  return (
    <div className="flex gap-4 mb-6">
      <div className="relative">
        <input
          type="file"
          accept=".srt"
          onChange={handleFileUpload}
          className="hidden"
          id="caption-upload"
        />
        <label
          htmlFor="caption-upload"
          className="flex items-center gap-2 px-4 py-2 bg-[#0072CE] hover:bg-[#005ba5] text-white rounded-lg cursor-pointer transition-colors"
        >
          <Upload className="w-4 h-4" />
          Upload Captions
        </label>
      </div>

      <button
        onClick={onAutoGenerate}
        disabled={isGenerating}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-white
          ${isGenerating 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-[#0072CE] hover:bg-[#005ba5]'}`}
      >
        <Wand2 className="w-4 h-4" />
        {isGenerating ? 'Generating...' : 'Auto-Generate'}
      </button>
    </div>
  );
};

export default CaptionControls;