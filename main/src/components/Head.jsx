import React, { useState, useEffect } from "react";
import Header from "./Header";
import {
  Save,
  X,
  RefreshCw,
  Home,
  Plus,
  X as XIcon,
  Camera,
  Check,
  AlertCircle,
} from "lucide-react";

function Head() {
  const [profile, setProfile] = useState({
    name: "",
    location: "",
    skillsOffered: [],
    skillsWanted: [],
    availability: "weekends",
    profileVisibility: "Public",
    profilePhoto: null,
  });

  const [originalProfile, setOriginalProfile] = useState(null);
  const [newSkillOffered, setNewSkillOffered] = useState("");
  const [newSkillWanted, setNewSkillWanted] = useState("");
  const [saveStatus, setSaveStatus] = useState("");
  const [errors, setErrors] = useState({});

  // Load profile from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile(parsedProfile);
      setOriginalProfile(parsedProfile);
    } else {
      // Set default profile
      const defaultProfile = {
        name: "",
        location: "",
        skillsOffered: ["Graphic Design", "Web Design", "Marketing"],
        skillsWanted: ["Python", "JavaScript", "Data Analysis"],
        availability: "weekends",
        profileVisibility: "Public",
        profilePhoto: null,
      };
      setProfile(defaultProfile);
      setOriginalProfile(defaultProfile);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!profile.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!profile.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (profile.skillsOffered.length === 0) {
      newErrors.skillsOffered = "At least one skill offered is required";
    }

    if (profile.skillsWanted.length === 0) {
      newErrors.skillsWanted = "At least one skill wanted is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const addSkill = (type, skill) => {
    if (skill.trim() && !profile[type].includes(skill.trim())) {
      setProfile((prev) => ({
        ...prev,
        [type]: [...prev[type], skill.trim()],
      }));
      if (type === "skillsOffered") setNewSkillOffered("");
      if (type === "skillsWanted") setNewSkillWanted("");

      // Clear error when skill is added
      if (errors[type]) {
        setErrors((prev) => ({
          ...prev,
          [type]: "",
        }));
      }
    }
  };

  const removeSkill = (type, skillToRemove) => {
    setProfile((prev) => ({
      ...prev,
      [type]: prev[type].filter((skill) => skill !== skillToRemove),
    }));
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setSaveStatus("Photo size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile((prev) => ({
          ...prev,
          profilePhoto: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!validateForm()) {
      setSaveStatus("Please fix the errors before saving");
      return;
    }

    try {
      localStorage.setItem("userProfile", JSON.stringify(profile));
      setOriginalProfile(profile);
      setSaveStatus("Profile saved successfully!");
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (error) {
      setSaveStatus("Error saving profile. Please try again.");
      setTimeout(() => setSaveStatus(""), 3000);
    }
  };

  const handleDiscard = () => {
    if (originalProfile) {
      setProfile(originalProfile);
    }
    setNewSkillOffered("");
    setNewSkillWanted("");
    setErrors({});
    setSaveStatus("Changes discarded");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  const handleSwapRequest = () => {
    // Swap skills offered and wanted
    setProfile((prev) => ({
      ...prev,
      skillsOffered: prev.skillsWanted,
      skillsWanted: prev.skillsOffered,
    }));
    setSaveStatus("Skills swapped successfully!");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  const handleHome = () => {
    // In a real app, this would navigate to home page
    setSaveStatus("Navigating to home...");
    setTimeout(() => setSaveStatus(""), 2000);
  };

  const hasChanges =
    JSON.stringify(profile) !== JSON.stringify(originalProfile);

  return (
    <div className="min-h-screen bg-slate-800">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bodybg2345  rounded-xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left Column - Form Fields */}
              <div className="lg:col-span-2 space-y-8">
                {/* Name Field */}
                <div className="space-y-3">
                  <label className="block text-xl font-bold text-slate-900">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`w-full px-0 py-3 text-xl bg-transparent border-0 border-b-3 focus:ring-0 focus:outline-none transition-all duration-300 ${
                      errors.name
                        ? "border-red-400 focus:border-red-600"
                        : "border-slate-300 focus:border-indigo-600"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm flex items-center gap-2">
                      <AlertCircle size={16} />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Location Field */}
                <div className="space-y-3">
                  <label className="block text-xl font-bold text-slate-900">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className={`w-full px-0 py-3 text-xl bg-transparent border-0 border-b-3 focus:ring-0 focus:outline-none transition-all duration-300 ${
                      errors.location
                        ? "border-red-400 focus:border-red-600"
                        : "border-slate-300 focus:border-indigo-600"
                    }`}
                    placeholder="Enter your city, country"
                  />
                  {errors.location && (
                    <p className="text-red-600 text-sm flex items-center gap-2">
                      <AlertCircle size={16} />
                      {errors.location}
                    </p>
                  )}
                </div>

                {/* Skills Offered */}
                <div className="space-y-4">
                  <label className="block text-xl font-bold text-slate-900">
                    Skills Offered *
                  </label>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {profile.skillsOffered.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-sm font-semibold border-2 border-blue-200 hover:from-blue-200 hover:to-indigo-200 transition-all duration-200 shadow-sm"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill("skillsOffered", skill)}
                          className="hover:text-blue-600 transition-colors duration-200 p-1 hover:bg-blue-200 rounded-full"
                        >
                          <XIcon size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newSkillOffered}
                      onChange={(e) => setNewSkillOffered(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        addSkill("skillsOffered", newSkillOffered)
                      }
                      className="flex-1 px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-lg"
                      placeholder="Add a skill you can offer"
                    />
                    <button
                      onClick={() => addSkill("skillsOffered", newSkillOffered)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  {errors.skillsOffered && (
                    <p className="text-red-600 text-sm flex items-center gap-2">
                      <AlertCircle size={16} />
                      {errors.skillsOffered}
                    </p>
                  )}
                </div>

                {/* Skills Wanted */}
                <div className="space-y-4">
                  <label className="block text-xl font-bold text-slate-900">
                    Skills Wanted *
                  </label>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {profile.skillsWanted.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 rounded-full text-sm font-semibold border-2 border-emerald-200 hover:from-emerald-200 hover:to-green-200 transition-all duration-200 shadow-sm"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill("skillsWanted", skill)}
                          className="hover:text-emerald-600 transition-colors duration-200 p-1 hover:bg-emerald-200 rounded-full"
                        >
                          <XIcon size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newSkillWanted}
                      onChange={(e) => setNewSkillWanted(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        addSkill("skillsWanted", newSkillWanted)
                      }
                      className="flex-1 px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-200 text-lg"
                      placeholder="Add a skill you want to learn"
                    />
                    <button
                      onClick={() => addSkill("skillsWanted", newSkillWanted)}
                      className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  {errors.skillsWanted && (
                    <p className="text-red-600 text-sm flex items-center gap-2">
                      <AlertCircle size={16} />
                      {errors.skillsWanted}
                    </p>
                  )}
                </div>

                {/* Availability */}
                <div className="space-y-3">
                  <label className="block text-xl font-bold text-slate-900">
                    Availability
                  </label>
                  <select
                    value={profile.availability}
                    onChange={(e) =>
                      handleInputChange("availability", e.target.value)
                    }
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-200 bg-white text-lg font-medium"
                  >
                    <option value="weekends">Weekends Only</option>
                    <option value="weekdays">Weekdays Only</option>
                    <option value="evenings">Evenings</option>
                    <option value="flexible">Flexible Schedule</option>
                    <option value="full-time">Full Time Available</option>
                    <option value="part-time">Part Time</option>
                  </select>
                </div>

                {/* Profile Visibility */}
                <div className="space-y-3">
                  <label className="block text-xl font-bold text-slate-900">
                    Profile Visibility
                  </label>
                  <select
                    value={profile.profileVisibility}
                    onChange={(e) =>
                      handleInputChange("profileVisibility", e.target.value)
                    }
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-200 bg-white text-lg font-medium"
                  >
                    <option value="Public">Public - Visible to everyone</option>
                    <option value="Private">
                      Private - Only visible to you
                    </option>
                    <option value="Friends">
                      Friends Only - Visible to connections
                    </option>
                    <option value="Limited">
                      Limited - Visible to verified users
                    </option>
                  </select>
                </div>
              </div>

              {/* Right Column - Profile Photo */}
              <div className="lg:col-span-1 flex flex-col items-center">
                <div className="relative group">
                  <div className="w-64 h-64 rounded-full border-4 border-dashed border-slate-300 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 transition-all duration-300 cursor-pointer group-hover:border-indigo-400 overflow-hidden">
                    {profile.profilePhoto ? (
                      <img
                        src={profile.profilePhoto}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <Camera
                          size={48}
                          className="mx-auto text-slate-400 group-hover:text-indigo-500 transition-colors duration-300 mb-3"
                        />
                        <div className="text-slate-700 font-bold text-lg mb-2">
                          Profile Photo
                        </div>
                        <div className="text-sm text-indigo-600 hover:text-indigo-700 transition-colors duration-200 font-semibold">
                          Click to upload
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handlePhotoUpload}
                  />
                  {profile.profilePhoto && (
                    <button
                      onClick={() =>
                        setProfile((prev) => ({ ...prev, profilePhoto: null }))
                      }
                      className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200 shadow-lg"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                <div className="mt-6 text-center max-w-xs">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Upload a professional photo to help others recognize you.
                    <span className="block mt-2 text-xs text-slate-500">
                      Maximum file size: 5MB
                    </span>
                  </p>
                </div>

                {/* Profile Stats */}
                <div className="mt-8 w-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    Profile Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Skills Offered:</span>
                      <span className="font-bold text-blue-600">
                        {profile.skillsOffered.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Skills Wanted:</span>
                      <span className="font-bold text-emerald-600">
                        {profile.skillsWanted.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Profile Status:</span>
                      <span
                        className={`font-bold ${
                          profile.profileVisibility === "Public"
                            ? "text-green-600"
                            : profile.profileVisibility === "Private"
                            ? "text-red-600"
                            : "text-orange-600"
                        }`}
                      >
                        {profile.profileVisibility}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="infinitywar">
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              hasChanges
                ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                : "bg-slate-200 text-slate-500 cursor-not-allowed"
            }`}
          >
            <Save size={20} />
            Save
          </button>
          <button
            onClick={handleDiscard}
            disabled={!hasChanges}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              hasChanges
                ? "bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                : "bg-slate-200 text-slate-500 cursor-not-allowed"
            }`}
          >
            <X size={20} />
            Discard
          </button>
          <button
            onClick={handleSwapRequest}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <RefreshCw size={20} />
            Swap Skills
          </button>
        </div>
      </main>
    </div>
  );
}

export default Head;
