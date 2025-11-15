import {useEffect, useState} from "react";
import type {SideBarTranscriptionList} from "../../widgets/Sidebar/types.ts";

export const useMockData = (count: number = 20): SideBarTranscriptionList => {
  const [mockData, setMockData] = useState<SideBarTranscriptionList>({
    data: [],
    total: 0
  });

  useEffect(() => {
    const data = Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      timeOfUpload: new Date(Date.now() - (i * 3600000)).toISOString().replace('T', ' ').substring(0, 19),
      text: i % 5 === 0 ? null : `Транскрипция файла ${i + 1} - ${'контент '.repeat((i % 3) + 1)}`
    }));

    setMockData({
      data,
      total: count
    });
  }, [count]);

  return mockData;
};