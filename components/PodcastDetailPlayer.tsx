"use client";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { api } from "@/convex/_generated/api";
import { useAudio } from '@/providers/AudioProvider';
import { PodcastDetailPlayerProps } from "@/types";

import LoaderSpinner from "./LoaderSpinner";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import GeneratePodcast from "./GeneratePodcast";
import GenerateThumbnail from "./GenerateThumbnail";

const PodcastDetailPlayer = ({
  audioUrl,
  podcastTitle,
  author,
  imageUrl,
  podcastId,
  imageStorageId,
  audioStorageId,
  isOwner,
  authorImageUrl,
  authorId,
}: PodcastDetailPlayerProps) => {
  const router = useRouter();
  const { setAudio } = useAudio();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const deletePodcast = useMutation(api.podcasts.deletePodcast);
  const updatePodcast = useMutation((api as any).podcasts.updatePodcast);
  const updatePodcastViews = useMutation(api.podcasts.updatePodcastViews);
  const [editTitle, setEditTitle] = useState(podcastTitle);
  const [editDescription, setEditDescription] = useState("");
  const [editVoiceType, setEditVoiceType] = useState("");
  const [editVoicePrompt, setEditVoicePrompt] = useState("");
  const [editImagePrompt, setEditImagePrompt] = useState("");
  const [editAudioUrl, setEditAudioUrl] = useState(audioUrl || "");
  const [editAudioStorageId, setEditAudioStorageId] = useState(audioStorageId);
  const [editImageUrl, setEditImageUrl] = useState(imageUrl || "");
  const [editImageStorageId, setEditImageStorageId] = useState(imageStorageId);
  const [editAudioDuration, setEditAudioDuration] = useState(0);
  const audioSampleRef = useRef<HTMLAudioElement | null>(null);

  // Fetch latest podcast data for editing
  const podcastData = useQuery(api.podcasts.getPodcastById, { podcastId });

  // Pre-fill state from fetched data when modal opens
  useEffect(() => {
    if (isEditOpen && podcastData) {
      setEditTitle(podcastData.podcastTitle || "");
      setEditDescription(podcastData.podcastDescription || "");
      setEditVoiceType(podcastData.voiceType || "");
      setEditVoicePrompt(podcastData.voicePrompt || "");
      setEditImagePrompt(podcastData.imagePrompt || "");
      setEditAudioUrl(podcastData.audioUrl || "");
      setEditAudioStorageId(podcastData.audioStorageId);
      setEditImageUrl(podcastData.imageUrl || "");
      setEditImageStorageId(podcastData.imageStorageId);
      setEditAudioDuration(podcastData.audioDuration || 0);
    }
  }, [isEditOpen, podcastData]);

  const handleDelete = async () => {
    try {
      await deletePodcast({ podcastId, imageStorageId, audioStorageId });
      toast({
        title: "Podcast deleted",
      });
      router.push("/");
    } catch (error) {
      console.error("Error deleting podcast", error);
      toast({
        title: "Error deleting podcast",
        variant: "destructive",
      });
    }
  };

  const handlePlay = () => {
    updatePodcastViews({ podcastId });
    setAudio({
      title: podcastTitle,
      audioUrl,
      imageUrl,
      author,
      podcastId,
    });
  };

  if (!imageUrl || !authorImageUrl) return <LoaderSpinner />;
  console.log('isown',isOwner)

  return (
    <div className="mt-6 flex w-full justify-between max-md:justify-center">
      <div className="flex flex-col gap-8 max-md:items-center md:flex-row">
        <Image
          src={imageUrl}
          width={250}
          height={250}
          alt="Podcast image"
          className="aspect-square rounded-lg"
        />
        <div className="flex w-full flex-col gap-5 max-md:items-center md:gap-9">
          <article className="flex flex-col gap-2 max-md:items-center">
            <h1 className="text-32 font-extrabold tracking-[-0.32px] text-white-1">
              {podcastTitle}
            </h1>
            <figure
              className="flex cursor-pointer items-center gap-2"
              onClick={() => {
                router.push(`/profile/${authorId}`);
              }}
            >
              <Image
                src={authorImageUrl}
                width={30}
                height={30}
                alt="Caster icon"
                className="size-[30px] rounded-full object-cover"
              />
              <h2 className="text-16 font-normal text-white-3">{author}</h2>
            </figure>
          </article>

          <Button
            onClick={handlePlay}
            className="text-16 w-full max-w-[250px] bg-orange-1 font-extrabold text-white-1"
          >
            <Image
              src="/icons/Play.svg"
              width={20}
              height={20}
              alt="random play"
            />{" "}
            &nbsp; Play podcast
          </Button>
        </div>
      </div>
      {isOwner && (
        <div className="relative mt-2 flex flex-col items-end gap-2">
          <Image
            src="/icons/three-dots.svg"
            width={20}
            height={30}
            alt="Three dots icon"
            className="cursor-pointer"
            onClick={() => setIsDeleting((prev) => !prev)}
          />
          {isDeleting && (
            <div className="absolute -left-32 -top-2 z-10 flex w-32 flex-col cursor-pointer justify-center gap-2 rounded-md bg-black-6 py-1.5 hover:bg-black-2">
              <div className="flex items-center gap-2 px-2 py-1 hover:bg-black-2 rounded" onClick={handleDelete}>
                <Image src="/icons/delete.svg" width={16} height={16} alt="Delete icon" />
                <h2 className="text-16 font-normal text-white-1">Delete</h2>
              </div>
              <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
                <SheetTrigger asChild>
                  <div className="flex items-center gap-2 px-2 py-1 hover:bg-black-2 rounded" onClick={() => { setIsEditOpen(true); setIsDeleting(false); }}>
                    <Image src="/icons/edit.svg" width={16} height={16} alt="Edit icon" />
                    <h2 className="text-16 font-normal text-white-1">Edit</h2>
                  </div>
                </SheetTrigger>
                <SheetContent
                  side={undefined}
                  className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-black-1 p-8 text-white-1 shadow-lg focus:outline-none"
                >
                  <h2 className="text-20 font-bold mb-4">Edit Podcast</h2>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      await updatePodcast({
                        podcastId,
                        podcastTitle: editTitle,
                        podcastDescription: editDescription,
                        voiceType: editVoiceType,
                        voicePrompt: editVoicePrompt,
                        imagePrompt: editImagePrompt,
                        audioUrl: editAudioUrl,
                        audioStorageId: editAudioStorageId,
                        imageUrl: editImageUrl,
                        imageStorageId: editImageStorageId,
                        audioDuration: editAudioDuration,
                      });
                      setIsEditOpen(false);
                      toast({ title: "Podcast updated!" });
                      router.refresh?.();
                    }}
                    className="flex flex-col gap-4"
                  >
                    <label className="text-16 font-semibold">Title</label>
                    <Input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="bg-black-2 text-white-1" />
                    <label className="text-16 font-semibold">Description</label>
                    <Textarea value={editDescription} onChange={e => setEditDescription(e.target.value)} className="bg-black-2 text-white-1" />
                    <label className="text-16 font-semibold">AI Voice</label>
                    <Select value={editVoiceType} onValueChange={setEditVoiceType}>
                      <SelectTrigger className="bg-black-2 text-white-1">
                        <SelectValue placeholder="Select AI Voice" />
                      </SelectTrigger>
                      <SelectContent className="bg-black-2 text-white-1">
                        {["Drew", "Sarah", "Brian", "Grandpa"].map((category) => (
                          <SelectItem key={category} value={category} className="capitalize focus:bg-orange-1">
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {/* Manual play button for sample voice */}
                    {editVoiceType && isEditOpen && (
                      <div className="flex items-center gap-2 mt-2">
                        <audio ref={audioSampleRef} src={`/${editVoiceType}.mp3`} />
                        <Button type="button" size="sm" className="bg-orange-1 text-black-1" onClick={() => audioSampleRef.current?.play()}>
                          ▶️ Play Sample
                        </Button>
                      </div>
                    )}
                    <label className="text-16 font-semibold">Voice Prompt (Transcription)</label>
                    <Textarea value={editVoicePrompt} onChange={e => setEditVoicePrompt(e.target.value)} className="bg-black-2 text-white-1" />
                    <label className="text-16 font-semibold">Thumbnail Prompt</label>
                    <Textarea value={editImagePrompt} onChange={e => setEditImagePrompt(e.target.value)} className="bg-black-2 text-white-1" />
                    <label className="text-16 font-semibold">Audio</label>
                    <GeneratePodcast
                      setAudioStorageId={setEditAudioStorageId as any}
                      setAudio={setEditAudioUrl}
                      voiceType={editVoiceType}
                      audio={editAudioUrl}
                      voicePrompt={editVoicePrompt}
                      setVoicePrompt={setEditVoicePrompt}
                      setAudioDuration={setEditAudioDuration}
                    />
                    <label className="text-16 font-semibold">Thumbnail</label>
                    <GenerateThumbnail
                      setImage={setEditImageUrl}
                      setImageStorageId={setEditImageStorageId as any}
                      image={editImageUrl}
                      imagePrompt={editImagePrompt}
                      setImagePrompt={setEditImagePrompt}
                    />
                    <Button type="submit" className="bg-orange-1 text-black-1 font-bold mt-4">Save Changes</Button>
                  </form>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PodcastDetailPlayer;
