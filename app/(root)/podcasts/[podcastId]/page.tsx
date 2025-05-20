"use client";

import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastCard from "@/components/PodcastCard";
import PodcastDetailPlayer from "@/components/PodcastDetailPlayer";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import React from "react";

const PodcastDetails = ({ params: { podcastId } }: { params: { podcastId: Id<'podcasts'> } }) => {
  // Fetch podcast details
  const podcast = useQuery(api.podcasts.getPodcastById, { podcastId });

  // Fetch similar podcasts
  const similarPodcasts = useQuery(api.podcasts.getPodcastByVoiceType, { podcastId });

  // Defensive: If podcast is null or undefined, show error instead of infinite loading
  if (podcast === null) {
    return (
      <EmptyState title="Podcast not found" buttonLink="/discover" buttonText="Go to Discover" />
    );
  }
  if (!podcast) return <LoaderSpinner />;
  const isOwn = podcast.user === podcast.authorId;
  // console.log('podcast', podcast.authorId, podcast.user);
  // Always render the player, fallback to empty string for missing fields
  return (
    <section className="flex w-full flex-col">
      <header className="mt-9 flex items-center justify-between">
        <h1 className="text-20 font-bold text-white-1">Currently Playing</h1>
        <figure className="flex gap-3">
          <Image src="/icons/headphone.svg" width={24} height={24} alt="headphone" />
          <h2 className="text-16 font-bold text-white-1">{podcast.views}</h2>
        </figure>
      </header>

      <PodcastDetailPlayer
        isOwner={isOwn}
        podcastId={podcast._id}
        audioUrl={podcast.audioUrl || ''}
        podcastTitle={podcast.podcastTitle || ''}
        author={podcast.author || ''}
        imageUrl={podcast.imageUrl || ''}
        imageStorageId={podcast.imageStorageId as any}
        audioStorageId={podcast.audioStorageId as any}
        authorImageUrl={podcast.authorImageUrl || 'data:image/png;base64,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'}
        authorId={podcast.authorId || ''}
      />

      <p className="text-white-2 text-16 pb-8 pt-[45px] font-medium max-md:text-center">{podcast.podcastDescription}</p>

      <div className="flex flex-col gap-8">
        <div className='flex flex-col gap-4'>
          <h1 className='text-18 font-bold text-white-1'>Transcription</h1>
          <p className="text-16 font-medium text-white-2">{podcast.voicePrompt}</p>
        </div>
        <div className='flex flex-col gap-4'>
          <h1 className='text-18 font-bold text-white-1'>Thumbnail Prompt</h1>
          <p className="text-16 font-medium text-white-2">{podcast.imagePrompt}</p>
        </div>
      </div>
      <section className="mt-8 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Similar Podcasts</h1>
        {similarPodcasts && similarPodcasts.length > 0 ? (
          <div className="podcast_grid">
            {similarPodcasts.map(({ _id, podcastTitle, podcastDescription, imageUrl }: any) => (
              <PodcastCard
                key={_id}
                imgUrl={imageUrl || ''}
                title={podcastTitle}
                description={podcastDescription}
                podcastId={_id}
              />
            ))}
          </div>
        ) : similarPodcasts && similarPodcasts.length === 0 ? (
          <EmptyState
            title="No similar podcasts found"
            buttonLink="/discover"
            buttonText="Discover more podcasts"
          />
        ) : (
          <LoaderSpinner />
        )}
      </section>
    </section>
  );
};

export default PodcastDetails;