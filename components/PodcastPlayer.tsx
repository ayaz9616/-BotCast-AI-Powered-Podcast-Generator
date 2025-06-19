// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";

// import { formatTime } from "@/lib/formatTime";
// import { cn } from "@/lib/utils";
// import { useAudio } from "@/providers/AudioProvider";

// import { Progress } from "./ui/progress";

// const PodcastPlayer = () => {
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [duration, setDuration] = useState(0);
//   const [isMuted, setIsMuted] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const { audio } = useAudio();

//   const togglePlayPause = () => {
//     if (audioRef.current?.paused) {
//       audioRef.current?.play();
//       setIsPlaying(true);
//     } else {
//       audioRef.current?.pause();
//       setIsPlaying(false);
//     }
//   };

//   const toggleMute = () => {
//     if (audioRef.current) {
//       audioRef.current.muted = !isMuted;
//       setIsMuted((prev) => !prev);
//     }
//   };

//   const forward = () => {
//     if (
//       audioRef.current &&
//       audioRef.current.currentTime &&
//       audioRef.current.duration &&
//       audioRef.current.currentTime + 5 < audioRef.current.duration
//     ) {
//       audioRef.current.currentTime += 5;
//     }
//   };

//   const rewind = () => {
//     if (audioRef.current && audioRef.current.currentTime - 5 > 0) {
//       audioRef.current.currentTime -= 5;
//     } else if (audioRef.current) {
//       audioRef.current.currentTime = 0;
//     }
//   };

//   useEffect(() => {
//     const updateCurrentTime = () => {
//       if (audioRef.current) {
//         setCurrentTime(audioRef.current.currentTime);
//       }
//     };

//     const audioElement = audioRef.current;
//     if (audioElement) {
//       audioElement.addEventListener("timeupdate", updateCurrentTime);

//       return () => {
//         audioElement.removeEventListener("timeupdate", updateCurrentTime);
//       };
//     }
//   }, []);

//   useEffect(() => {
//     const audioElement = audioRef.current;
//     if (audio?.audioUrl) {
//       if (audioElement) {
//         audioElement.play().then(() => {
//           setIsPlaying(true);
//         });
//       }
//     } else {
//       audioElement?.pause();
//       setIsPlaying(true);
//     }
//   }, [audio]);
//   const handleLoadedMetadata = () => {
//     if (audioRef.current) {
//       setDuration(audioRef.current.duration);
//     }
//   };

//   const handleAudioEnded = () => {
//     setIsPlaying(false);
//   };

//   return (
//     <div
//       className={cn("sticky bottom-0 left-0 flex size-full flex-col", {
//         hidden: !audio?.audioUrl || audio?.audioUrl === "",
//       })}
//     >
//       {/* change the color for indicator inside the Progress component in ui folder */}
//       <Progress
//         value={(currentTime / duration) * 100}
//         className="w-full"
//         max={duration}
//       />
//       <section className="glassmorphism-black flex h-[112px] w-full items-center justify-between px-4 max-md:justify-center max-md:gap-5 md:px-12">
//         <audio
//           ref={audioRef}
//           src={audio?.audioUrl}
//           className="hidden"
//           onLoadedMetadata={handleLoadedMetadata}
//           onEnded={handleAudioEnded}
//         />
//         <div className="flex max-w-[200px] shrink-0 items-center gap-4 truncate max-md:hidden">
//           <Link href={`/podcast/${audio?.podcastId}`}>
//             <Image
//               src={audio?.imageUrl! || "/images/player1.png"}
//               width={64}
//               height={64}
//               alt="player1"
//               className="aspect-square rounded-xl"
//             />
//           </Link>
//           <div className="flex w-[160px] flex-col">
//             <h2 className="text-14 truncate font-semibold text-white-1">
//               {audio?.title}
//             </h2>
//             <p className="text-12 font-normal text-white-2">{audio?.author}</p>
//           </div>
//         </div>
//         <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform cursor-pointer gap-3 md:gap-6">
//           <div className="flex items-center gap-1.5">
//             <Image
//               src={"/icons/reverse.svg"}
//               width={24}
//               height={24}
//               alt="rewind"
//               onClick={rewind}
//             />
//             <h2 className="text-12 font-bold text-white-4">-5</h2>
//           </div>
//           <Image
//             src={isPlaying ? "/icons/Pause.svg" : "/icons/Play.svg"}
//             width={30}
//             height={30}
//             alt="play"
//             onClick={togglePlayPause}
//           />
//           <div className="flex items-center gap-1.5">
//             <h2 className="text-12 font-bold text-white-4">+5</h2>
//             <Image
//               src={"/icons/forward.svg"}
//               width={24}
//               height={24}
//               alt="forward"
//               onClick={forward}
//             />
//           </div>
//         </div>
//         <div className="flex items-center gap-6">
//           <h2 className="text-16 font-normal text-white-2 max-md:hidden">
//             {formatTime(duration)}
//           </h2>
//           <div className="flex w-full gap-2">
//             <Image
//               src={isMuted ? "/icons/unmute.svg" : "/icons/mute.svg"}
//               width={24}
//               height={24}
//               alt="mute unmute"
//               onClick={toggleMute}
//               className="cursor-pointer"
//             />
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default PodcastPlayer;






'use client'

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import { formatTime } from "@/lib/formatTime"
import { cn } from "@/lib/utils"
import { useAudio } from "@/providers/AudioProvider"

import { Progress } from "./ui/progress"

const PodcastPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const { audio } = useAudio()

  const togglePlayPause = () => {
    if (audioRef.current?.paused) {
      audioRef.current?.play()
      setIsPlaying(true)
    } else {
      audioRef.current?.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted((prev) => !prev)
    }
  }

  const forward = () => {
    if (audioRef.current && audioRef.current.currentTime + 5 < audioRef.current.duration) {
      audioRef.current.currentTime += 5
    }
  }

  const rewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 5, 0)
    }
  }

  useEffect(() => {
    const updateCurrentTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime)
      }
    }

    const audioElement = audioRef.current
    audioElement?.addEventListener("timeupdate", updateCurrentTime)

    return () => {
      audioElement?.removeEventListener("timeupdate", updateCurrentTime)
    }
  }, [])

  useEffect(() => {
    const audioElement = audioRef.current
    if (audio?.audioUrl) {
      audioElement?.play().then(() => setIsPlaying(true))
    } else {
      audioElement?.pause()
      setIsPlaying(false)
    }
  }, [audio])

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

  return (
    <div
      className={cn(
        "sticky bottom-0 left-0 flex w-full flex-col bg-black-1 z-50",
        {
          hidden: !audio?.audioUrl || audio?.audioUrl === "",
        }
      )}
    >
      {/* Progress Bar */}
      <Progress
        value={(currentTime / duration) * 100}
        className="w-full"
        max={duration}
      />

      {/* Player UI */}
      <section className="relative glassmorphism-black h-[112px] w-full flex items-center px-4 md:px-12">

        {/* Audio Element */}
        <audio
          ref={audioRef}
          src={audio?.audioUrl}
          className="hidden"
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleAudioEnded}
        />

        {/* Podcast Info (left) */}
        <div className="flex max-w-[240px] shrink-0 items-center gap-4 truncate max-md:hidden">
          <Link href={`/podcast/${audio?.podcastId}`}>
            <Image
              src={audio?.imageUrl! || "/images/player1.png"}
              width={64}
              height={64}
              alt="player cover"
              className="aspect-square rounded-xl"
            />
          </Link>
          <div className="flex w-[160px] flex-col">
            <h2 className="text-14 truncate font-semibold text-white-1">
              {audio?.title}
            </h2>
            <p className="text-12 font-normal text-white-2">
              {audio?.author}
            </p>
          </div>
        </div>

        {/* Control Buttons (centered absolutely) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-4 md:gap-6">
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={rewind}>
            <Image src="/icons/reverse.svg" width={24} height={24} alt="rewind" />
            <span className="text-12 font-bold text-white-4">-5</span>
          </div>
          <Image
            src={isPlaying ? "/icons/Pause.svg" : "/icons/Play.svg"}
            width={32}
            height={32}
            alt="toggle play"
            className="cursor-pointer"
            onClick={togglePlayPause}
          />
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={forward}>
            <span className="text-12 font-bold text-white-4">+5</span>
            <Image src="/icons/forward.svg" width={24} height={24} alt="forward" />
          </div>
        </div>

        {/* Duration & Mute (right) */}
        <div className="flex items-center gap-4 ml-auto max-md:hidden">
          <span className="text-14 font-normal text-white-2">
            {formatTime(duration)}
          </span>
          <Image
            src={isMuted ? "/icons/unmute.svg" : "/icons/mute.svg"}
            width={24}
            height={24}
            alt="toggle mute"
            className="cursor-pointer"
            onClick={toggleMute}
          />
        </div>
      </section>
    </div>
  )
}

export default PodcastPlayer
