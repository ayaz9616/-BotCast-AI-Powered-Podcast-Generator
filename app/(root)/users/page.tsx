'use client';
export const dynamic = "force-dynamic";
import { Suspense } from "react";

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import LoaderSpinner from '@/components/LoaderSpinner'
import EmptyState from '@/components/EmptyState'
import { useDebounce } from '@/lib/useDebounce'
import { TopPodcastersProps } from '@/types'

const UsersPage = () => {
  const [search, setSearch] = useState('')
  const [filteredUsers, setFilteredUsers] = useState<TopPodcastersProps[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search') || ''
  
  // Fetch all users
  const allUsers = useQuery(api.users.getTopUserByPodcastCount)
  
  const debouncedSearch = useDebounce(search, 500)

  useEffect(() => {
    if (debouncedSearch) {
      router.push(`/users?search=${debouncedSearch}`)
    } else {
      router.push('/users')
    }
  }, [debouncedSearch, router])

  useEffect(() => {
    if (allUsers) {
      if (searchQuery) {
        const filtered = allUsers.filter(user => 
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setFilteredUsers(filtered)
      } else {
        setFilteredUsers(allUsers)
      }
    }
  }, [allUsers, searchQuery])

  useEffect(() => {
    setSearch(searchQuery)
  }, [searchQuery])

  return (
    <Suspense fallback={<LoaderSpinner />}>
      <div className="flex flex-col gap-9">
        <div className="relative mt-8 block">
          <Input 
            className="input-class py-6 pl-12 focus-visible:ring-offset-orange-1"
            placeholder='Search for users'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Image 
            src="/icons/search.svg"
            alt="search"
            height={20}
            width={20}
            className="absolute left-4 top-3.5"
          />
        </div>

        <div className="flex flex-col gap-9">
          <h1 className="text-20 font-bold text-white-1">
            {!searchQuery ? 'All Podcasters' : 'Search results for '}
            {searchQuery && <span className="text-white-2">{searchQuery}</span>}
          </h1>

          {filteredUsers ? (
            <>
              {filteredUsers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredUsers.map((user) => (
                    <div 
                      key={user._id} 
                      className="flex flex-col cursor-pointer bg-black-2 p-5 rounded-xl hover:bg-black-3 transition-all min-h-[100px] " 
                      onClick={() => router.push(`/profile/${user.clerkId}`)}
                    >
                      <div className="flex items-center gap-6 mb-4">
                        <Image
                          src={user.imageUrl}
                          alt={user.name}
                          width={60}
                          height={60}
                          className="rounded-xl object-cover"
                        />
                        <div className="max-w-full">
                          <h2 className="text-16 font-semibold text-white-1">{user.name}</h2>
                          <p className="text-12 font-normal text-white-2 break-words max-w-[300px] md:max-w-[400px]">{user.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-2">
                          <Image
                            src="/icons/microphone.svg"
                            alt="podcasts"
                            width={18}
                            height={18}
                          />
                          <p className="text-16 font-medium text-white-1">{user.totalPodcasts} podcasts</p>
                        </div>
                        
                        <div className="flex items-center">
                          <Image 
                            src="/icons/right-arrow.svg"
                            alt="view profile"
                            width={26}
                            height={26}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : <EmptyState title="No users found" />}
            </>
          ) : <LoaderSpinner />}
        </div>
      </div>
    </Suspense>
  )
}

export default UsersPage