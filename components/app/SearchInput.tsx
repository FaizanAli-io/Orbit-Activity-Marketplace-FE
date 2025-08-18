import React from 'react';
import { Input, InputWrapper } from '../ui/input';
import { Search } from 'lucide-react';

const SearchInput = () => {
  return (
    <InputWrapper className='shadow-[0_4px_4px_0_#00000040] border-none mb-5'>
      <Search />
      <Input type='search' placeholder='Search' />
    </InputWrapper>
  );
};

export default SearchInput;
