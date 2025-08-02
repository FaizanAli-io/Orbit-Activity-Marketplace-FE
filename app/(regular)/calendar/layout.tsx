import { CalendarProvider } from '@/calendar/contexts/calendar-context';
import { IEvent } from '@/calendar/interfaces';
import { getEvents } from '@/lib/data/calendar-events/getEvents';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

// const events: IEvent[] = [
//   {
//     id: 1,
//     title: 'Mountains Hiking',
//     description: 'Lorem ipsum dolor',
//     startDate: new Date().toISOString(), // ISO string
//     endDate: new Date().toISOString(), // ISO string
//     color: 'green',
//     user: {
//       id: '1',
//       name: 'Ali',
//       picturePath: '',
//     },
//   },
// ];

export default async function Layout({ children }: Props) {
  const { success, data } = await getEvents();

  if (!success)
    return (
      <div className='grid place-content-center'>
        <h1 className='text-destructive text-3xl font-bold '>
          Something went wrong!
        </h1>
      </div>
    );

  let events: IEvent[];

  if (!data) {
    events = [];
  } else {
    events = data.map(e => ({
      id: e.id,
      title: e.activity.name,
      description: e.activity.description,
      startDate: new Date(e.startTime).toISOString(),
      endDate: new Date(e.endTime).toISOString(),
      color: 'green',
      user: {
        id: '',
        name: '',
        picturePath: '',
      },
    }));
  }

  return (
    <CalendarProvider users={[]} events={events}>
      {children}
    </CalendarProvider>
  );
}
