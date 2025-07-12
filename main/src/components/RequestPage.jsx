import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import StarRating from "./StarRating";
import SkillTag from "./SkillTag";

const RequestPage = ({ profile, onBack }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMySkill, setSelectedMySkill] = useState("");
  const [selectedTheirSkill, setSelectedTheirSkill] = useState("");
  const [message, setMessage] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [user, setUser] = useState(null); // Local user state

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSendClick = () => {
    if (!user) {
      setLoginError(true);
      return;
    }
    setShowModal(true);
  };

  const handleSubmit = () => {
    console.log("Swap Request Sent:", {
      from: user?.name,
      to: profile.name,
      mySkill: selectedMySkill,
      theirSkill: selectedTheirSkill,
      message,
    });

    // Close modal and reset form
    setShowModal(false);
    setSelectedMySkill("");
    setSelectedTheirSkill("");
    setMessage("");
    alert("Swap request sent!");
  };

  useEffect(() => {
    if (loginError) {
      const timeout = setTimeout(() => setLoginError(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [loginError]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-white">
      <button onClick={onBack} className="text-sm text-teal-400 underline mb-6">
        ← Back to profiles
      </button>

      <div className="bg-slate-800 p-6 rounded-xl flex flex-col md:flex-row gap-8">
        <div className="w-40 h-40 bg-slate-700 rounded-full border-2 border-slate-600 flex items-center justify-center">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="h-12 w-12 text-slate-400" />
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{profile.name}</h1>
          <StarRating rating={profile.rating} />

          <div className="mt-4">
            <p className="text-teal-400 font-medium mb-2">Skills Offered:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.skillsOffered.map((skill, idx) => (
                <SkillTag key={idx} skill={skill} type="offered" />
              ))}
            </div>

            <p className="text-blue-400 font-medium mb-2">Skills Wanted:</p>
            <div className="flex flex-wrap gap-2">
              {profile.skillsWanted.map((skill, idx) => (
                <SkillTag key={idx} skill={skill} type="wanted" />
              ))}
            </div>
          </div>

          <button
            onClick={handleSendClick}
            className="mt-6 bg-teal-600 hover:bg-teal-700 px-6 py-2 rounded-lg font-medium text-sm"
          >
            Send Swap Request
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-slate-800 border border-slate-600 rounded-xl w-full max-w-md p-6 text-white relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-slate-400 hover:text-white text-xl"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4">Send Swap Request</h2>

            <div className="mb-4">
              <label className="block mb-1 text-sm text-teal-400">
                Choose one of your offered skills
              </label>
              <select
                value={selectedMySkill}
                onChange={(e) => setSelectedMySkill(e.target.value)}
                className="w-full p-2 rounded bg-slate-700 border border-slate-600"
              >
                <option value="">Select a skill</option>
                {user?.skills_offered?.map((skill, idx) => (
                  <option key={idx} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm text-blue-400">
                Choose one of their wanted skills
              </label>
              <select
                value={selectedTheirSkill}
                onChange={(e) => setSelectedTheirSkill(e.target.value)}
                className="w-full p-2 rounded bg-slate-700 border border-slate-600"
              >
                <option value="">Select a skill</option>
                {profile.skillsWanted.map((skill, idx) => (
                  <option key={idx} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm text-white">Message</label>
              <textarea
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 rounded bg-slate-700 border border-slate-600"
                placeholder="Type your message..."
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-teal-600 hover:bg-teal-700 py-2 rounded-lg font-medium"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Login Error Message */}
      {loginError && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium z-50">
          You must be logged in to send a swap request.
        </div>
      )}
    </div>
  );
};

export default RequestPage;
