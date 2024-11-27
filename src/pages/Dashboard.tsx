import { useState } from 'react';
import { useThemeStore } from '../store/themeStore';
import CreatePostDialog from '../components/CreatePostDialog';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';

export default function Dashboard() {
  const { isDarkMode } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);

  const FACEBOOK_APP_ID = '578229984580643';
  const FRONTEND_REDIRECT_URI = 'http://localhost:5174/';
  const BACKEND_REDIRECT_URI = 'http://localhost:3000/auth/callback';
  const SCOPES = 'instagram_basic,instagram_content_publish,pages_show_list,pages_manage_posts';


  const handleLogin = () => {
    const authUrl = `https://www.facebook.com/v17.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(BACKEND_REDIRECT_URI)}&scope=${SCOPES}&response_type=code`;
    window.location.href = authUrl; // Redirect to Facebook
};

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Content Calendar</h1>
          <button
            // onClick={() => setIsOpen(true)}
            onClick={(()=>handleLogin())}
            className={`flex items-center gap-2 ${
              isDarkMode ? 'bg-white text-black' : 'bg-black text-white'
            } px-4 py-2 rounded-lg hover:opacity-90 transition-colors`}
          >
            <Plus className="w-5 h-5" />
            Create Post
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Calendar View */}
          <div className={`col-span-2 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl p-6`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                <h2 className="text-xl font-semibold">March 2024</h2>
              </div>
              <div className="flex gap-4">
                <button className={`px-4 py-2 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                } rounded-lg`}>Week</button>
                <button className={`px-4 py-2 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                } rounded-lg`}>Month</button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-4">
              {Array.from({ length: 35 }).map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                  } rounded-lg p-2 hover:opacity-80 transition-colors cursor-pointer`}
                >
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scheduled Posts */}
          <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl p-6`}>
            <h2 className="text-xl font-semibold mb-6">Upcoming Posts</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((post) => (
                <div key={post} className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                } rounded-lg p-4`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                    } rounded-lg`}></div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Scheduled for</p>
                      <p className="font-medium">March {post}, 2024</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <CreatePostDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}