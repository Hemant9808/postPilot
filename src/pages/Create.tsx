import { useState } from 'react';
import { useThemeStore } from '../store/themeStore';
import CreatePostDialog from '../components/CreatePostDialog';
import { Plus } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  status: 'todo' | 'inProgress' | 'done';
}

export default function Create() {
  const { isDarkMode } = useThemeStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, title: 'Summer Collection Post', status: 'todo' },
    { id: 2, title: 'Product Launch', status: 'inProgress' },
    { id: 3, title: 'Brand Story', status: 'done' },
  ]);

  const getColumnPosts = (status: Post['status']) => 
    posts.filter(post => post.status === status);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Content Creation</h1>
          <button
            onClick={() => setIsDialogOpen(true)}
            className={`flex items-center gap-2 ${
              isDarkMode ? 'bg-white text-black' : 'bg-black text-white'
            } px-4 py-2 rounded-lg hover:opacity-90 transition-colors`}
          >
            <Plus className="w-5 h-5" />
            Create Post
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* To Do */}
          <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl p-6`}>
            <h2 className="text-xl font-semibold mb-4">To Do</h2>
            <div className="space-y-4">
              {getColumnPosts('todo').map((post) => (
                <div
                  key={post.id}
                  className={`${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                  } rounded-lg p-4 cursor-pointer hover:opacity-80 transition-colors`}
                >
                  <p className="font-medium">{post.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* In Progress */}
          <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl p-6`}>
            <h2 className="text-xl font-semibold mb-4">In Progress</h2>
            <div className="space-y-4">
              {getColumnPosts('inProgress').map((post) => (
                <div
                  key={post.id}
                  className={`${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                  } rounded-lg p-4 cursor-pointer hover:opacity-80 transition-colors`}
                >
                  <p className="font-medium">{post.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Done */}
          <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl p-6`}>
            <h2 className="text-xl font-semibold mb-4">Done</h2>
            <div className="space-y-4">
              {getColumnPosts('done').map((post) => (
                <div
                  key={post.id}
                  className={`${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                  } rounded-lg p-4 cursor-pointer hover:opacity-80 transition-colors`}
                >
                  <p className="font-medium">{post.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <CreatePostDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </div>
    </div>
  );
}