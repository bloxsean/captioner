import React, { useState, useRef } from 'react';
import { Subtitles, Video, VideoOff, Type, Edit2 } from 'lucide-react';
import VideoPlayer from './components/VideoPlayer';
import CaptionEditor from './components/CaptionEditor';
import CaptionControls from './components/CaptionControls';
import { Caption } from './types';

function App() {
  const [showCaptions, setShowCaptions] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [captions, setCaptions] = useState<Caption[]>([
    { id: 1, startTime: 0, endTime: 2, text: "[MUSIC]" },
    { id: 2, startTime: 2, endTime: 7, text: "Steven Decatur Jr. Ashton Martin recently returned to the Athlete Academy in Berlin after a short time off." },
    { id: 3, startTime: 7, endTime: 15, text: "I used to come here a lot and I felt like it got me explosive, got me faster, got me stronger." },
    { id: 4, startTime: 15, endTime: 22, text: "Took a little bit off and I feel like that came off my game a little bit so when I came back I feel like I got that back with the explosiveness, strength, balance, all that." },
    { id: 5, startTime: 22, endTime: 27, text: "Marge says excelling in La Crosse has been a lifelong goal." },
    { id: 6, startTime: 27, endTime: 35, text: "Ever since I was young I grew up around it and my dad played it all through high school so it's just something that's been through the family and I'm passionate about just the sport in general." },
    { id: 7, startTime: 35, endTime: 40, text: "The forward has been training on the La Crosse field and at the Athlete Academy to reach these aspirations." },
    { id: 8, startTime: 40, endTime: 48, text: "Personally to play my best, help my teammates get better, help the team overall eventually go to the state championship as we all think we can in the locker room." },
    { id: 9, startTime: 48, endTime: 56, text: "And for the team, I mean we all know what the angle is, we all trust each other. Coaches trust players, we all know what we can do." },
    { id: 10, startTime: 56, endTime: 62, text: "I think that's a state championship, I think we can all do that and we all know we can." },
    { id: 11, startTime: 62, endTime: 66, text: "Marge says the coaches at the Athlete Academy are pushing him to achieve." },
    { id: 12, startTime: 66, endTime: 75, text: "They treat you like a friend but also as a coach so they have that personal connection with you where you can trust them and trust them with what they're doing with your body and we can trust them with what they're teaching us." },
    { id: 13, startTime: 75, endTime: 80, text: "As many other Seahawk athletes work out together and motivate each other at this facility." },
    { id: 14, startTime: 80, endTime: 87, text: "Seeing everyone else get better makes you want to go be better yourself and it just brings all the sports together. It makes us a better athlete overall." },
    { id: 15, startTime: 87, endTime: 91, text: "And this will only help Marge pursue his passion at the next level." },
    { id: 16, startTime: 91, endTime: 98, text: "My dream is to play at the D1 level. I have a couple of interests right now from a couple of schools." },
    { id: 17, startTime: 98, endTime: 106, text: "So I mean coming here every day knowing that I have to strengthen myself, get faster, get better every single day, that's what it does for us." },
    { id: 18, startTime: 106, endTime: 112, text: "Reporting from Berlin, Maryland, for the Delmarva Sports Network, I'm Michelle Roberts." },
    { id: 19, startTime: 112, endTime: 114, text: "[crowd chatter]" },
    { id: 20, startTime: 114, endTime: 116, text: "[BLANK_AUDIO]" }
  ]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
    
    const activeCaption = captions.findIndex(cap => 
      time >= cap.startTime && time <= cap.endTime
    );
    
    if (activeCaption !== -1 && editorRef.current) {
      const captionElement = document.getElementById(`caption-${activeCaption}`);
      if (captionElement) {
        editorRef.current.scrollTo({
          top: captionElement.offsetTop - editorRef.current.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleCaptionUpdate = (updatedCaption: Caption) => {
    setCaptions(prev => 
      prev.map(cap => cap.id === updatedCaption.id ? updatedCaption : cap)
    );
  };

  const handleCaptionsUpload = (newCaptions: Caption[]) => {
    setCaptions(newCaptions);
  };

  const handleAutoGenerate = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      setCaptions([...captions]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="bg-white border-b border-gray-200 py-4 px-6 mb-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="w-8 h-8 text-[#0072CE]" />
            <h1 className="text-2xl font-bold text-gray-900">VideoHub Pro</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative bg-black rounded-lg overflow-hidden shadow-lg">
              <VideoPlayer
                ref={videoRef}
                src="https://cdn.field59.com/DELMARVASPORTS/abb9326c410f2544e39b738006f02524b6dc9d1e_fl9-720p.mp4"
                captions={showCaptions ? captions : []}
                onTimeUpdate={handleTimeUpdate}
              />
              
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={() => setShowCaptions(!showCaptions)}
                  className="p-2 bg-gray-800/80 rounded-full hover:bg-gray-700/80 transition-colors"
                  title={showCaptions ? "Hide Captions" : "Show Captions"}
                >
                  {showCaptions ? <Subtitles className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Type className="w-5 h-5 text-[#0072CE]" />
                <h2 className="text-lg font-semibold text-gray-900">Video Information</h2>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Athlete Academy Feature</h3>
              <p className="text-gray-600">
                Feature story on Ashton Martin's training at the Athlete Academy in Berlin.
                Watch how dedication and hard work shape the future of local athletes.
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Edit2 className="w-5 h-5 text-[#0072CE]" />
              <h2 className="text-lg font-semibold text-gray-900">Caption Editor</h2>
            </div>
            
            <CaptionControls
              onCaptionsUpload={handleCaptionsUpload}
              onAutoGenerate={handleAutoGenerate}
              isGenerating={isGenerating}
            />

            <div ref={editorRef} className="h-[600px] overflow-y-auto pr-4 space-y-4">
              <CaptionEditor
                captions={captions}
                onCaptionUpdate={handleCaptionUpdate}
                videoRef={videoRef}
                currentTime={currentTime}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;