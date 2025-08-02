import Block from '@/app/layout/Block';
import { ClientContainer } from '@/calendar/components/client-container';

export default function Page() {
  return (
    <Block>
      <ClientContainer view='month' />
    </Block>
  );
}
