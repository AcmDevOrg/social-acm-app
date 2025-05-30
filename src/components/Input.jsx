'use client'
import React, { useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRef, useState, useEffect } from 'react';
import { MdAddAPhoto } from "react-icons/md";
import Image from 'next/image';


export default function Input() {
    const { user, isSignedIn, isLoaded } = useUser();
    const imagePickRef = useRef(null);

    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [text, setText] = useState('');
    const [postLoading, setPostLoading] = useState(false);
    
    
    useEffect(() => {
        if (selectedFile) {
            uploadImageToCloudinary();
        }
    }, [selectedFile]);

  // ✅ File input change handler
  const handleFileChange = async (e) => {
  const file = e.target.files?.[0];
  if (file) {
    setSelectedFile(file);

    // Preview the image locally
      const base64 = await toBase64(file);
      setImageFileUrl(base64);

      // Upload image
      setImageFileUploading(true);
      try {
        const uploadedUrl = await uploadImageToCloudinary(file);
        setImageFileUrl(uploadedUrl); // Final uploaded URL
      } catch (err) {
        console.error('Upload error:', err);
      } finally {
        setImageFileUploading(false);
      }
    }
  };

  const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,    
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Upload failed');
  }

  return data.url || null;
};

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
    
    const handleSubmit = async () => {
        setPostLoading(true);        
        const response = await fetch('/api/post/create', {
            method: 'POST',
            headers: {                
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userMongoId: user.publicMetadata.userMongoId,
                name: user.fullName,
                username: user.username,
                text,
                profileImg: user.imageUrl,
                image: imageFileUrl,
            }),
        });
        setPostLoading(false);
        setText('');
        setSelectedFile(null);
        setImageFileUrl(null);
        location.reload();
    };

    if (!isSignedIn || !isLoaded) {
        return null;
    }
  return (
    <div className='flex border-b border-gray-200 p-3 space-x-3 w-full'>
        <Image  
        width={200} height={200}     
        src={user?.imageUrl} 
        alt='user-img' 
        className='h-11 w-11 rounded-full cursor-pointer hover:brightness-95 object-cover' 
        />
        <div className='w-full divide-y divide-gray-200'>
            <textarea 
            className='w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700 '
            placeholder='Whats happening' 
            rows='2' 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            ></textarea>
            {selectedFile && (
                <Image
                onClick={() => {
                    setSelectedFile(null);
                    setImageFileUrl(null);
                }}
                width={300} 
                height={300}
                src={imageFileUrl} 
                alt='selected-img' 
                className={`w-full max-h-[250px] object-cover cursor-pointer ${
                    imageFileUploading ? 'animate-pulse' : ''
                    }`} 
                    /> 
            )}
            <div className='flex items-center justify-between pt-2.5'>
                <MdAddAPhoto 
                className='h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer' 
                onClick={() => imagePickRef.current.click()}
                />
                <input 
                type='file'
                    ref={imagePickRef}
                    accept='image/*'
                    hidden
                    onChange={handleFileChange} 
                    />
                <button 
                disabled={text.trim() === '' || postLoading || imageFileUploading}
                className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50'
                 onClick={handleSubmit}
                 >
                    Post
                </button>
            </div>
        </div>
    </div>
  );
}
