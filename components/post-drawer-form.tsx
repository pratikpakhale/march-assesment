'use client';

import { SetStateAction, useState, Dispatch, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Post from '@/types/post';
import { PostService } from '@/lib/api';

export default function CreatePostDrawer({
  editPost,
  setIsOpen,
}: Readonly<{
  editPost: Post | null;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}>) {
  const { toast } = useToast();

  const [post, setPost] = useState<Post>({
    userId: 0,
    title: '',
    body: '',
  });

  useEffect(() => {
    if (editPost) {
      setPost(editPost);
    } else {
      setPost({
        userId: 0,
        title: '',
        body: '',
      });
    }
  }, [editPost]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost(prev => ({
      ...prev,
      [name]: name === 'userId' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editPost?.id) {
      const res = await PostService.update(editPost.id, post);

      if (res) {
        toast({
          title: 'Post Updated',
          description:
            'Your post has been updated successfully with ID ' + res.id,
        });
      }
    } else {
      const res = await PostService.create(post);
      if (res) {
        toast({
          title: 'Post Created',
          description:
            'Your post has been created successfully with ID ' + res.id,
        });
      }
    }
    setPost({
      userId: 0,
      title: '',
      body: '',
    });
    setIsOpen(false);
  };

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>
          {!editPost ? 'Create a new post' : 'Edit the post'}
        </DrawerTitle>
        <DrawerDescription>
          {!editPost
            ? 'Fill in the details for your new post.'
            : 'Update  the details for your post.'}
        </DrawerDescription>
      </DrawerHeader>
      <form onSubmit={handleSubmit}>
        <div className='p-4 pb-0'>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='userId'>User ID</Label>
              <Input
                id='userId'
                name='userId'
                type='number'
                placeholder='Enter user ID'
                value={post.userId}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='title'>Title</Label>
              <Input
                id='title'
                name='title'
                placeholder='Enter post title'
                value={post.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='body'>Body</Label>
              <Textarea
                id='body'
                name='body'
                placeholder='Enter post body'
                value={post.body}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button type='submit'>Submit Post</Button>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </form>
    </DrawerContent>
  );
}
