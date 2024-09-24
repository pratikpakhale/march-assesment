'use client';

import { PostService, UserService } from '@/lib/api';
import Post from '@/types/post';
import User from '@/types/user';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import UserCard from '@/components/user-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CreatePostDrawer from '@/components/post-drawer-form';
import { PencilIcon, Trash2Icon, BadgePlus } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  const [hoverUser, setHoverUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editPost, setEditPost] = useState<Post | null>(null);

  const fetchPosts = useCallback(async () => {
    const posts = await PostService.getAll();
    setPosts(posts);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className='flex p-4 w-full items-end flex-col'>
      <div className='mb-4'>
        <Drawer
          open={isOpen}
          onOpenChange={setIsOpen}
          onClose={() => {
            setEditPost(null);
          }}
        >
          <DrawerTrigger asChild>
            <Button variant={'outline'} className='w-fit'>
              <BadgePlus className='h-4 mr-1' /> New Post
            </Button>
          </DrawerTrigger>

          <CreatePostDrawer setIsOpen={setIsOpen} editPost={editPost} />
        </Drawer>
      </div>

      <div className='flex flex-wrap w-full'>
        {posts.map(post => (
          <Card className='w-96 m-2' key={post.id}>
            <CardHeader>
              <Link href={`/posts/${post.id}`} key={post.id}>
                <CardTitle className='flex items-center justify-start pb-4'>
                  <HoverCard
                    openDelay={150}
                    onOpenChange={async () => {
                      setHoverUser(await UserService.getById(post.userId));
                    }}
                    closeDelay={0}
                  >
                    <HoverCardTrigger asChild>
                      <Link href={`/users/${post.userId}`}>
                        <Avatar>
                          <AvatarImage src='https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg' />
                          <AvatarFallback>{post.userId}</AvatarFallback>
                        </Avatar>
                      </Link>
                    </HoverCardTrigger>
                    <HoverCardContent className='w-fit'>
                      <UserCard user={hoverUser} />
                    </HoverCardContent>
                  </HoverCard>

                  <span className='ml-2'>{post.title}</span>
                </CardTitle>
                <CardDescription>{post.body}</CardDescription>
              </Link>
              <div className='flex justify-end pt-4'>
                <button className='mr-1'>
                  <PencilIcon
                    className='h-4'
                    onClick={async () => {
                      if (post?.id) {
                        const epost = await PostService.getById(post.id);
                        setEditPost(epost);
                        setIsOpen(true);
                      }
                    }}
                  />
                </button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button>
                      <Trash2Icon className='h-4' />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your post.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className='bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90'
                        onClick={async () => {
                          if (post?.id) {
                            await PostService.delete(post.id);
                            toast({
                              title: 'Post Deleted',
                              description:
                                'Your post has been deleted successfully',
                            });
                          }
                        }}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
