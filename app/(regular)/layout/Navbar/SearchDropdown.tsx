import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import React from 'react';

const SearchDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='rounded-full'>
          <SearchIcon className='h-5 w-5 text-gray-500 dark:text-gray-400' />
          <span className='sr-only'>Search</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[300px] p-4'>
        <div className='relative'>
          <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
          <Input
            type='search'
            placeholder='Search...'
            className='pl-8 w-full'
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SearchDropdown;
