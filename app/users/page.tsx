'use client';

import { useState, useEffect, useCallback } from 'react';

import UserCard from '@/components/user-card';

import User from '@/types/user';
import { UserService } from '@/lib/api';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useCallback(async () => {
    const users = await UserService.getAll();
    setUsers(users);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className='flex p-4 w-full items-end flex-col'>
      <div className='flex flex-wrap w-full'>
        {users.map(user => (
          <div key={user.id} className='m-2'>
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </div>
  );
}
