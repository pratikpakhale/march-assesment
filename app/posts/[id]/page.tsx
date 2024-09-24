'use client';

import { useParams } from 'next/navigation';

import Post from '@/types/post';
import User from '@/types/user';
import Comment from '@/types/comment';
import { PostService, UserService } from '@/lib/api';
import Link from 'next/link';
import UserCard from '@/components/user-card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const [hoverUser, setHoverUser] = useState<User | null>(null);

  const fetchPost = useCallback(async () => {
    if (!id) return;
    const post = await PostService.getById(Number(id));
    setPost(post);
  }, [id]);

  const fetchComments = useCallback(async () => {
    if (!id) return;
    const comments = await PostService.customRequest<Comment[]>({
      url: `${PostService.endpoint}/${id}/comments`,
    });
    setComments(comments);
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h2 className='text-lg font-bold'>Post</h2>
      <div>
        <Card key={post.id} className='w-full m-2'>
          <CardHeader>
            <CardTitle className='flex items-center justify-start'>
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
          </CardHeader>
        </Card>
      </div>
      <h3>Comments</h3>
      {comments.map(comment => {
        return (
          <div key={comment.id}>
            <Card className='w-full m-2'>
              <CardHeader>
                <CardTitle className='flex items-center justify-start'>
                  <span>
                    {comment.name}({comment.email})
                  </span>
                </CardTitle>
                <CardDescription>{post.body}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
