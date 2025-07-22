// import React from 'react';
// import { Input } from '../ui/input';
// import { cn } from '@/lib/utils';

// type TimePickerProps = {
//   value?: string;
//   onChange?: (value: string) => void;
//   id?: string;
//   className?: string;
// };

// const TimePicker: React.FC<TimePickerProps> = ({
//   value,
//   onChange,
//   id = 'time-picker',
//   className = '',
// }) => {
//   return (
//     <Input
//       type='time'
//       id={id}
//       step='1'
//       value={value}
//       onChange={e => onChange?.(e.target.value)}
//       className={cn(
//         'bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none max-w-min',
//         className
//       )}
//     />
//   );
// };

// export default TimePicker;
