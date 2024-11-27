import { Fragment, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';
import { Image as ImageIcon, X, Smile } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import EmojiPicker from 'emoji-picker-react';
import { useThemeStore } from '../store/themeStore';

interface CreatePostDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePostDialog({ isOpen, onClose }: CreatePostDialogProps) {
  const { isDarkMode } = useThemeStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
      'video/*': []
    },
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
    }
  });

  const onEmojiClick = (emojiObject: any) => {
    setCaption((prevCaption) => prevCaption + emojiObject.emoji);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel 
                className={`relative ${
                  isDarkMode ? 'bg-gray-900' : 'bg-white'
                } rounded-xl p-6 max-w-2xl w-full transform transition-all`}
              >
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>

                <Dialog.Title className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  Create New Post
                </Dialog.Title>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed ${
                        isDarkMode ? 'border-gray-700' : 'border-gray-300'
                      } rounded-lg p-8 text-center cursor-pointer hover:border-gray-500 transition-colors`}
                    >
                      <input {...getInputProps()} />
                      {selectedFile ? (
                        <div>
                          <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Preview"
                            className="max-h-48 mx-auto mb-4"
                          />
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {selectedFile.name}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <ImageIcon className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                            Drag & drop or click to upload
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="relative">
                      <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                        Caption
                      </label>
                      <div className="relative">
                        <textarea
                          value={caption}
                          onChange={(e) => setCaption(e.target.value)}
                          className={`w-full h-32 ${
                            isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-black'
                          } rounded-lg p-3`}
                          placeholder="Write your caption..."
                        />
                        <button
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          className="absolute right-2 bottom-2"
                        >
                          <Smile className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                        </button>
                      </div>
                      {showEmojiPicker && (
                        <div className="absolute right-0 bottom-full mb-2 z-50">
                          <EmojiPicker onEmojiClick={onEmojiClick} theme={isDarkMode ? 'dark' : 'light'} />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                        Schedule Date
                      </label>
                      <input
                        type="datetime-local"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        className={`w-full ${
                          isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-black'
                        } rounded-lg p-3`}
                      />
                    </div>

                    <button className={`w-full ${
                      isDarkMode ? 'bg-white text-black' : 'bg-black text-white'
                    } py-3 rounded-lg font-semibold hover:opacity-90 transition-colors`}>
                      Schedule Post
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}