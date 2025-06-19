"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import GeneratePodcast from "@/components/GeneratePodcast"
import GenerateThumbnail from "@/components/GenerateThumbnail"
import { Loader } from "lucide-react"
import { Id } from "@/convex/_generated/dataModel"
import { useToast } from "@/components/ui/use-toast"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useRouter } from "next/navigation"

// const voiceCategories = ['alloy', 'shimmer', 'nova', 'echo', 'fable', 'onyx'];
const voiceCategories = ['Drew', "Sarah","Brian"];

const formSchema = z.object({
  podcastTitle: z.string().min(2),
  podcastDescription: z.string().min(2),
})

const CreatePodcast = () => {
  const router = useRouter()
  const { user, isLoaded } = useUser();
  const { toast } = useToast();
  // Form setup;
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  
  // Redirect if user is not authenticated
  useEffect(() => {
    if (isLoaded) {
      setIsAuthChecking(false);
      if (!user) {
        // Show toast notification and redirect
        toast({
          title: 'Authentication required',
          description: 'You need to sign in to create a podcast',
          variant: 'destructive',
        });
        router.push('/sign-in');
      }
    }
  }, [isLoaded, user, router, toast]);
  
  // Only query user data if user exists
  const clerkId = user?.id || "";
  const convexUser = useQuery(api.users.getUserById, { 
    clerkId 
  }, {
    // Only enable the query when user is authenticated
    enabled: !!user
  });

  const [imagePrompt, setImagePrompt] = useState('');
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null)
  const [imageUrl, setImageUrl] = useState('');
  
  const [audioUrl, setAudioUrl] = useState('');
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(null)
  const [audioDuration, setAudioDuration] = useState(0);
  
  const [voiceType, setVoiceType] = useState<string | null>(null);
  const [voicePrompt, setVoicePrompt] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createPodcast = useMutation(api.podcasts.createPodcast)
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: "",
    },
  })
 
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      console.log('audioUrl', audioUrl);
      console.log('imageUrl', imageUrl);
      console.log('voiceType', voiceType);
      console.log('audioStorageId', audioStorageId);
      console.log('imageStorageId', imageStorageId);
      console.log('voicePrompt', voicePrompt);
      console.log('imagePrompt', imagePrompt);
      console.log('audioDuration', audioDuration);
      console.log('convexUser', convexUser);
      console.log('user', user);
      console.log('data', data);
      
      if (!audioUrl || !imageUrl || !voiceType || !audioStorageId || !imageStorageId || audioDuration === 0) {
        toast({
          title: 'Please generate audio, image, and fill all required fields.',
          variant: 'destructive',
        });
        setIsSubmitting(false);
        return;
      }
      if (!convexUser) {
        toast({ title: 'User not loaded. Please try again.', variant: 'destructive' });
        setIsSubmitting(false);
        return;
      }
      const podcast = await createPodcast({
        podcastTitle: data.podcastTitle,
        podcastDescription: data.podcastDescription,
        audioUrl,
        imageUrl,
        voiceType,
        imagePrompt,
        voicePrompt,
        views: 0,
        audioDuration,
        audioStorageId: audioStorageId!,
        imageStorageId: imageStorageId!,
        user: convexUser?._id,
        author: user?.fullName || "Anonymous",
        authorId: user?.id || "",
        authorImageUrl: user?.imageUrl || "",
      });
      console.log('while creating', podcast);
      toast({ title: 'Podcast created' });
      setIsSubmitting(false);
      router.push('/');
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  }

  // Show loading state while checking authentication
  if (isAuthChecking) {
    return (
      <div className="mt-10 flex flex-col items-center justify-center">
        <Loader size={40} className="animate-spin text-orange-1" />
        <p className="mt-4 text-white-1">Checking authentication...</p>
      </div>
    );
  }

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-20 font-bold text-white-1">Create Podcast</h1>
      

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex w-full flex-col">
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">Title</FormLabel>
                  <FormControl>
                    <Input className="input-class focus-visible:ring-offset-orange-1" placeholder="Future Of AI" {...field} />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2.5">
              <Label className="text-16 font-bold text-white-1">
                Select AI Voice
              </Label>

              <Select onValueChange={(value) => setVoiceType(value)}>
                <SelectTrigger className={cn('text-16 w-full border-none bg-black-1 text-gray-1 focus-visible:ring-offset-orange-1')}>
                  <SelectValue placeholder="Select AI Voice" className="placeholder:text-gray-1 " />
                </SelectTrigger>
                <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1">
                  {voiceCategories.map((category) => (
                    <SelectItem key={category} value={category} className="capitalize focus:bg-orange-1">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
                {voiceType && (
                  <audio 
                    src={`/${voiceType}.mp3`}
                    autoPlay
                    className="hidden"
                  />
                )}
              </Select>
            </div>

            <FormField
              control={form.control}
              name="podcastDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">Description</FormLabel>
                  <FormControl>
                    <Textarea className="input-class focus-visible:ring-offset-orange-1" placeholder="Write a short podcast description" {...field} />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col pt-10">
              <GeneratePodcast 
                setAudioStorageId={setAudioStorageId}
                setAudio={setAudioUrl}
                voiceType={voiceType!}
                audio={audioUrl}
                voicePrompt={voicePrompt}
                setVoicePrompt={setVoicePrompt}
                setAudioDuration={setAudioDuration}
              />

              <GenerateThumbnail 
               setImage={setImageUrl}
               setImageStorageId={setImageStorageId}
               image={imageUrl}
               imagePrompt={imagePrompt}
               setImagePrompt={setImagePrompt}
              />

              <div className="mt-10 w-full">
                <Button type="submit" className="text-16 w-full bg-orange-1 py-4 font-extrabold text-#000000 transition-all duration-500 hover:bg-black-1">
                  {isSubmitting ? (
                    <>
                      Submitting
                      <Loader size={20} className="animate-spin ml-2" />
                    </>
                  ) : (
                    'Submit & Publish Podcast'
                  )}
                </Button>
              </div>
          </div>
        </form>
      </Form>
    </section>
  )
}

export default CreatePodcast