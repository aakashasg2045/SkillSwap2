import React from 'react'
import Header from "./Header.jsx"
import SearchSection from './SearchSection.jsx';
import ProfileCard from './ProfileCard';
import Pagination from './Pagination';
import RequestPage from './RequestPage';
import { mockProfiles } from '../data/mockProfiles';
import { useState } from 'react';


export const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const profilesPerPage = 3;
  const totalPages = Math.ceil(mockProfiles.length / profilesPerPage);

  const getCurrentProfiles = () => {
    const startIndex = (currentPage - 1) * profilesPerPage;
    const endIndex = startIndex + profilesPerPage;
    return mockProfiles.slice(startIndex, endIndex);
  };

  const handleRequest = (profile) => {
    setSelectedProfile(profile); // Open full page view
  };

  const handleBack = () => {
    setSelectedProfile(null); // Return to list
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <SearchSection />

      {selectedProfile ? (
        <RequestPage profile={selectedProfile} onBack={handleBack} />
      ) : (
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Available Skill Exchangers</h2>
            <p className="text-slate-400">Connect with people to share and learn new skills</p>
          </div>

          <div className="space-y-6">
            {getCurrentProfiles().map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onRequest={handleRequest}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </main>
      )}
    </div>
  )
}
