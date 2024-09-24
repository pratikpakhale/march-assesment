'use client';

import { useState, useEffect, useCallback } from 'react';

import { useParams } from 'next/navigation';

import UserCard from '@/components/user-card';

import User from '@/types/user';
import { UserService } from '@/lib/api';

export default function Users() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = useCallback(async () => {
    if (!id) return;
    const user = await UserService.getById(Number(id));
    setUser(user);
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className='flex p-4 w-full items-end flex-col'>
      <div className='flex flex-wrap w-full'>
        <div key={user.id} className='m-2'>
          <UserCard user={user} />
        </div>
      </div>
    </div>
  );
}
