import { MapPin, Phone, Globe, Briefcase, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import User from '@/types/user';

export default function UserCard({ user }: Readonly<{ user: User | null }>) {
  if (!user) {
    return null;
  }
  return (
    <Card className='w-full max-w-3xl mx-auto'>
      <CardHeader className='flex flex-row items-center gap-4'>
        <Avatar className='w-20 h-20'>
          <AvatarImage
            src={`https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg`}
            alt={user.name}
          />
          <AvatarFallback>{user.id}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className='text-2xl'>{user.name}</CardTitle>
          <p className='text-sm text-muted-foreground'>@{user.username}</p>
        </div>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex items-center gap-2'>
            <Mail className='w-4 h-4 text-muted-foreground' />
            <span>{user.email}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Phone className='w-4 h-4 text-muted-foreground' />
            <span>{user.phone}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Globe className='w-4 h-4 text-muted-foreground' />
            <a
              href={`https://${user.website}`}
              target='_blank'
              rel='noopener noreferrer'
              className='hover:underline'
            >
              {user.website}
            </a>
          </div>
        </div>
        <div className='space-y-2'>
          <h3 className='font-semibold'>Address</h3>
          <div className='flex items-start gap-2'>
            <MapPin className='w-4 h-4 text-muted-foreground mt-1' />
            <span>
              {user.address.street}, {user.address.suite}
              <br />
              {user.address.city}, {user.address.zipcode}
            </span>
          </div>
        </div>
        <div className='space-y-2'>
          <h3 className='font-semibold'>Company</h3>
          <div className='flex items-start gap-2'>
            <Briefcase className='w-4 h-4 text-muted-foreground mt-1' />
            <div>
              <p className='font-medium'>{user.company.name}</p>
              <p className='text-sm text-muted-foreground'>
                {user.company.catchPhrase}
              </p>
              <p className='text-sm text-muted-foreground'>{user.company.bs}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
