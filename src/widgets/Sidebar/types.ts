import type { FileData } from '@/api/types/api-types.ts';

interface MenuItemInterface {
  title: string | null;
}

interface SidebarTranscriptionListInterface {
  data: FileData[];
  total: number;
}

export type MenuListProps = Omit<SidebarTranscriptionListInterface, 'total'>;

export type MenuItemProps = MenuItemInterface;

export type SideBarTranscriptionList = SidebarTranscriptionListInterface;
