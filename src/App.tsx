import React, { useState, useEffect } from 'react';
import { ViewTab, ResourceItem, VideoItem, LegalModalType } from './types';
import { ALL_RESOURCES, POPULAR_VIDEOS } from './data/mockData';
import { loadMDXContent } from './lib/contentLoader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhatWeDo } from './components/WhatWeDo';
import { PopularVideos } from './components/PopularVideos';
import { PopularResources } from './components/PopularResources';
import { ResourceLibrary } from './components/ResourceLibrary';
import { VideoLibrary } from './components/VideoLibrary';
import { AboutSection } from './components/AboutSection';
import { ResourceModal } from './components/ResourceModal';
import { VideoModal } from './components/VideoModal';
import { LegalModal } from './components/LegalModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { OwnerPortalModal } from './components/OwnerPortalModal';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ViewTab>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);
  const [adminAuthOpen, setAdminAuthOpen] = useState(false);
  const [ownerPortalOpen, setOwnerPortalOpen] = useState(false);

  // Dynamic Content State loaded directly from MDX content files
  const [resources, setResources] = useState<ResourceItem[]>(() => {
    const { resources: mdxRes } = loadMDXContent();
    if (mdxRes && mdxRes.length > 0) return mdxRes;
    try {
      const stored = localStorage.getItem('bonsai_resources_v2');
      return stored ? JSON.parse(stored) : ALL_RESOURCES;
    } catch {
      return ALL_RESOURCES;
    }
  });

  const [videos, setVideos] = useState<VideoItem[]>(() => {
    const { videos: mdxVids } = loadMDXContent();
    if (mdxVids && mdxVids.length > 0) return mdxVids;
    try {
      const stored = localStorage.getItem('bonsai_videos_v2');
      return stored ? JSON.parse(stored) : POPULAR_VIDEOS;
    } catch {
      return POPULAR_VIDEOS;
    }
  });

  // Re-sync with MDX on mount
  useEffect(() => {
    const { resources: mdxRes, videos: mdxVids } = loadMDXContent();
    if (mdxRes && mdxRes.length > 0) {
      setResources(mdxRes);
    }
    if (mdxVids && mdxVids.length > 0) {
      setVideos(mdxVids);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('bonsai_resources_v2', JSON.stringify(resources));
    } catch (e) {
      console.error(e);
    }
  }, [resources]);

  useEffect(() => {
    try {
      localStorage.setItem('bonsai_videos_v2', JSON.stringify(videos));
    } catch (e) {
      console.error(e);
    }
  }, [videos]);

  // Local storage for bookmarked resources
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('bonsai_saved_resources');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bonsai_saved_resources', JSON.stringify(savedIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedIds]);

  const handleOpenAdmin = () => {
    const isAuth = sessionStorage.getItem('bonsai_admin_authenticated') === 'true';
    if (isAuth) {
      setOwnerPortalOpen(true);
    } else {
      setAdminAuthOpen(true);
    }
  };

  useEffect(() => {
    if (window.location.pathname.includes('/admin') || window.location.hash.includes('admin')) {
      handleOpenAdmin();
    }
  }, []);

  // Handle keyboard command / ctrl + k shortcut to jump to search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCurrentTab('resources');
        const searchInput = document.querySelector<HTMLInputElement>('input[placeholder*="Search"]');
        if (searchInput) {
          searchInput.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleSave = (id: string) => {
    setSavedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleOpenSearch = () => {
    setCurrentTab('resources');
    setTimeout(() => {
      const searchInput = document.querySelector<HTMLInputElement>('input[placeholder*="Search"]');
      if (searchInput) {
        searchInput.focus();
      }
    }, 100);
  };

  const handleSelectResourceById = (id: string) => {
    const found = resources.find(r => r.id === id);
    if (found) {
      setSelectedResource(found);
    }
  };

  // Content Upload / Edit / Delete Handlers
  const handleSaveResource = (resource: ResourceItem) => {
    setResources(prev => {
      const idx = prev.findIndex(r => r.id === resource.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = resource;
        return updated;
      }
      return [resource, ...prev];
    });
  };

  const handleDeleteResource = (id: string) => {
    setResources(prev => prev.filter(r => r.id !== id));
    if (selectedResource?.id === id) {
      setSelectedResource(null);
    }
  };

  const handleSaveVideo = (video: VideoItem) => {
    setVideos(prev => {
      const idx = prev.findIndex(v => v.id === video.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = video;
        return updated;
      }
      return [video, ...prev];
    });
  };

  const handleDeleteVideo = (id: string) => {
    setVideos(prev => prev.filter(v => v.id !== id));
    if (selectedVideo?.id === id) {
      setSelectedVideo(null);
    }
  };

  const handleResetToSeedData = () => {
    setResources(ALL_RESOURCES);
    setVideos(POPULAR_VIDEOS);
    try {
      localStorage.removeItem('bonsai_resources_v2');
      localStorage.removeItem('bonsai_videos_v2');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans selection:bg-black selection:text-white">
      
      {/* Header Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenSearch={handleOpenSearch}
        savedCount={savedIds.length}
      />

      {/* Main Dynamic View Area */}
      <main className="flex-grow">
        {currentTab === 'home' && (
          <>
            <Hero
              onSelectTab={setCurrentTab}
              onSearchQuery={(q) => {
                setSearchQuery(q);
                setCurrentTab('resources');
              }}
            />

            <WhatWeDo />

            <PopularVideos
              videos={videos}
              onSelectVideo={setSelectedVideo}
              onSelectResourceById={handleSelectResourceById}
              onViewAllVideos={() => setCurrentTab('videos')}
            />

            <PopularResources
              resources={resources}
              onSelectResource={setSelectedResource}
              onViewAllResources={() => setCurrentTab('resources')}
            />

            <ResourceLibrary
              resources={resources}
              onSelectResource={setSelectedResource}
              initialSearchQuery={searchQuery}
              savedIds={savedIds}
              onToggleSave={handleToggleSave}
            />
          </>
        )}

        {currentTab === 'resources' && (
          <ResourceLibrary
            resources={resources}
            onSelectResource={setSelectedResource}
            initialSearchQuery={searchQuery}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
          />
        )}

        {currentTab === 'videos' && (
          <VideoLibrary
            videos={videos}
            onSelectVideo={setSelectedVideo}
            onSelectResourceById={handleSelectResourceById}
          />
        )}

        {currentTab === 'about' && (
          <AboutSection />
        )}
      </main>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Footer */}
      <Footer
        onOpenLegal={setLegalModal}
        onSelectTab={setCurrentTab}
      />

      {/* Modals */}
      <ResourceModal
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
        isSaved={selectedResource ? savedIds.includes(selectedResource.id) : false}
        onToggleSave={handleToggleSave}
      />

      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        onOpenResourceById={handleSelectResourceById}
      />

      <LegalModal
        type={legalModal}
        onClose={() => setLegalModal(null)}
      />

      <AdminAuthModal
        isOpen={adminAuthOpen}
        onClose={() => setAdminAuthOpen(false)}
        onAuthenticated={() => {
          setAdminAuthOpen(false);
          setOwnerPortalOpen(true);
        }}
      />

      <OwnerPortalModal
        isOpen={ownerPortalOpen}
        onClose={() => setOwnerPortalOpen(false)}
        resources={resources}
        videos={videos}
        onSaveResource={handleSaveResource}
        onDeleteResource={handleDeleteResource}
        onSaveVideo={handleSaveVideo}
        onDeleteVideo={handleDeleteVideo}
        onResetToSeedData={handleResetToSeedData}
      />

    </div>
  );
}
