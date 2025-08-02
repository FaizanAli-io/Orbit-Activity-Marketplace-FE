import Block from '@/app/layout/Block';
import { ClientContainer } from '@/calendar/components/client-container';

export default function Page() {
  return (
    <Block space={false}>
      <ClientContainer view='month' />
    </Block>
  );
}
