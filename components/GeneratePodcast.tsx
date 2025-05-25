import { useRef, useState, ChangeEvent } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { GeneratePodcastProps } from '@/types';
import { Loader } from 'lucide-react';
import { Input } from './ui/input';
import Image from 'next/image';
import { useToast } from './ui/use-toast';
import { useMutation } from 'convex/react';
import { useUploadFiles } from '@xixixao/uploadstuff/react';
import { api } from '@/convex/_generated/api';
import { v4 as uuidv4 } from 'uuid';

const useGeneratePodcast = ({ setAudio, voiceType, voicePrompt, setAudioStorageId }: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const getAudioUrl = useMutation(api.podcasts.getUrl);

  const generatePodcast = async () => {
    setIsGenerating(true);
    setAudio('');
    if (!voicePrompt) {
      toast({
        title: 'Please provide a voiceType to generate a podcast',
        className: 'text-black',
      });
      return setIsGenerating(false);
    }
    try {
      console.log("testtt");
      console.log('SERVER_URL:', process.env.NEXT_PUBLIC_SERVER_URL);
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/elevenlabs`, {
        method: 'POST',
        body: JSON.stringify({ input: voicePrompt, voice: voiceType })
      });
      const blob = await response.blob();
      const fileName = `podcast-${uuidv4()}.mp3`;
      const file = new File([blob], fileName, { type: 'audio/mpeg' });
      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;
      setAudioStorageId(storageId);
      const audioUrl = await getAudioUrl({ storageId });
      setAudio(audioUrl!);
      setIsGenerating(false);
      toast({
        title: 'Podcast generated successfully',
        className: 'text-black',
      });
    } catch (error) {
      console.log('Error generating podcast', error);
      toast({
        title: 'Error creating a podcast',
        variant: 'destructive',
        className: 'text-black',
      });
      setIsGenerating(false);
    }
  };
  return { isGenerating, generatePodcast };
};

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const { isGenerating, generatePodcast } = useGeneratePodcast(props);
  const [audioSource, setAudioSource] = useState<'ai' | 'upload'>('ai');
  const [uploading, setUploading] = useState(false);
  const audioRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const getAudioUrl = useMutation(api.podcasts.getUrl);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'audio/mpeg') {
      toast({ title: 'Please upload an MP3 file', variant: 'destructive', className: 'text-black' });
      return;
    }
    setUploading(true);
    try {
      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;
      props.setAudioStorageId(storageId);
      const audioUrl = await getAudioUrl({ storageId });
      props.setAudio(audioUrl!);
      toast({ title: 'MP3 uploaded successfully', className: 'text-black' });
    } catch (error) {
      toast({ title: 'Error uploading MP3', variant: 'destructive', className: 'text-black' });
    }
    setUploading(false);
  };

  return (
    <>
      <div className="generate_thumbnail">
        <Button
          type="button"
          variant="plain"
          onClick={() => setAudioSource('ai')}
          className={cn('', { 'bg-black-6': audioSource === 'ai' })}
        >
          Use AI to generate audio
        </Button>
        <Button
          type="button"
          variant="plain"
          onClick={() => setAudioSource('upload')}
          className={cn('', { 'bg-black-6': audioSource === 'upload' })}
        >
          Upload custom MP3
        </Button>
      </div>
      {audioSource === 'ai' ? (
        <div className="flex flex-col gap-5">
          <div className="mt-5 flex flex-col gap-2.5">
            <Label className="text-16 font-bold text-white-1">Script for Podcast</Label>
            <Textarea
              className="input-class font-light focus-visible:ring-offset-orange-1"
              placeholder="Provide text to generate audio"
              rows={5}
              value={props.voicePrompt}
              onChange={(e) => props.setVoicePrompt(e.target.value)}
            />
          </div>
          <div className="w-full max-w-[200px]">
            <Button type="button" className="text-16 bg-orange-1 py-4 font-bold text-#000000" onClick={generatePodcast}>
              {isGenerating ? (
                <>
                  Generating
                  <Loader size={20} className="animate-spin ml-2" />
                </>
              ) : (
                'Generate'
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="image_div" onClick={() => audioRef?.current?.click()}>
          <Input
            type="file"
            className="hidden"
            ref={audioRef}
            accept="audio/mpeg"
            onChange={handleFileUpload}
            disabled={uploading}
          />
          {!uploading ? (
            <Image src="/icons/upload-image.svg" width={40} height={40} alt="upload" />
          ) : (
            <div className="text-16 flex-center font-medium text-white-1">
              Uploading
              <Loader size={20} className="animate-spin ml-2" />
            </div>
          )}
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-12 font-bold text-orange-1">Click to upload</h2>
            <p className="text-12 font-normal text-gray-1">MP3 only</p>
          </div>
        </div>
      )}
      {props.audio && (
        <div className="flex-center w-full">
          <audio
            controls
            src={props.audio}
            autoPlay
            className="mt-5"
            onLoadedMetadata={(e) => props.setAudioDuration(e.currentTarget.duration)}
          />
        </div>
      )}
    </>
  );
};

export default GeneratePodcast;
