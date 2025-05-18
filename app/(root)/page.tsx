"use client";
import PodcastCard from '@/components/PodcastCard'
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoaderSpinner from '@/components/LoaderSpinner';
import EmptyState from '@/components/EmptyState';

const Home = () => {
  const trendingPodcasts: any = useQuery(api.podcasts.getTrendingPodcasts);

  if(!trendingPodcasts) return <LoaderSpinner />
  
  return (
    <div className="mt-9 flex flex-col gap-9 md:overflow-hidden">
      <section className='flex flex-col gap-5'>
        <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>

        <div className="podcast_grid">
          {trendingPodcasts.length > 0 ? (
            trendingPodcasts.map(({ _id, podcastTitle, podcastDescription, imageUrl }: any) => (
              <PodcastCard 
                key={_id}
                imgUrl={imageUrl as string}
                title={podcastTitle}
                description={podcastDescription}
                podcastId={_id}
              />
            ))
          ) : (
            <EmptyState title="No trending podcasts found" />
          )}
        </div>
      </section>
    </div>
  )
}

export default Home