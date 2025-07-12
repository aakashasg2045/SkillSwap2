import React from 'react';
import { User } from 'lucide-react';
import StarRating from './StarRating';
import SkillTag from './SkillTag';

const ProfileCard = ({ profile, onRequest }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-200 hover:shadow-lg">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center border-2 border-slate-600">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="h-8 w-8 text-slate-400" />
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="btnreq flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">{profile.name}</h3>
              <StarRating rating={profile.rating} />
            </div>
            <button
              onClick={() => onRequest(profile)} // Pass full profile
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Request
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-teal-400 mb-2 font-medium">Skills Offered:</p>
              <div className="flex flex-wrap gap-2">
                {profile.skillsOffered.map((skill, index) => (
                  <SkillTag key={index} skill={skill} type="offered" />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-blue-400 mb-2 font-medium">Skills Wanted:</p>
              <div className="flex flex-wrap gap-2">
                {profile.skillsWanted.map((skill, index) => (
                  <SkillTag key={index} skill={skill} type="wanted" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
