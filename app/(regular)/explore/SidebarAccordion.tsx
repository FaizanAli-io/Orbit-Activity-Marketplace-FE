import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';

interface Props {
  value: string;
  title: string;
  categories: { id: number; name: string }[];
}

const SidebarAccordion = ({ value, categories, title }: Props) => {
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value={value}>
        <AccordionTrigger className='cursor-pointer'>{title}</AccordionTrigger>
        <AccordionContent>
          <ul className='space-y-1'>
            {categories.map(c => (
              <li key={c.id} className='text-md'>
                <Link href={`/explore?category=${c.id}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SidebarAccordion;
