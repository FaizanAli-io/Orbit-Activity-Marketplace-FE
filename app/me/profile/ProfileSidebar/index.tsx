import * as React from 'react';
import { GalleryVerticalEnd } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import MenuLink from './MenuLink';
import LogoutButton from './LogoutButton';
import { getLinks } from './sidebar-links';

export async function ProfileSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const data = await getLinks();

  return (
    <Sidebar variant='inset' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link href='#'>
                <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                  <GalleryVerticalEnd className='size-4' />
                </div>
                <div className='flex flex-col gap-0.5 leading-none'>
                  <span className='font-medium'>Profile</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className='gap-2'>
            {data &&
              data.items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton>
                    <MenuLink title={item.title} url={item.url} />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

            <SidebarMenuItem className='ml-2 cursor-pointer'>
              <LogoutButton />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
