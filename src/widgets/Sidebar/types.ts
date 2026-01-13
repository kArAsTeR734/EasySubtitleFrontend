import type { FileData } from '@/api/types/api-types.ts';

interface SidebarTranscriptionListInterface {
  data: FileData[];
  total: number;
}

export type MenuListProps = Omit<SidebarTranscriptionListInterface, 'total'>;

export type SideBarTranscriptionList = SidebarTranscriptionListInterface;
