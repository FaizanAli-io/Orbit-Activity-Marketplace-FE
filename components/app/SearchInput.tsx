import React, { HTMLAttributes } from 'react';
import { Input, InputWrapper } from '../ui/input';
import { Search } from 'lucide-react';

const SearchInput = (props: HTMLAttributes<HTMLInputElement>) => {
  return (
    <InputWrapper className=' border-none'>
      <Search />
      <Input type='search' placeholder='Search' {...props} />
    </InputWrapper>
  );
};

export default SearchInput;
