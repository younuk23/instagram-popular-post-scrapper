import { useState } from 'react';
import { ScrapResult } from 'main/scrapper/scrapperManager';
import { invokeWithCustomErrors } from 'renderer/utils';
import { HashTag, URL } from 'main/scrapper/types';

interface UseRequestScrapResult {
  requestScrap(hashTags: HashTag[], urls: URL[]): void;
  result: ScrapResult[] | null;
  screenShotDir: string | null;
  isLoading: boolean;
}
export const useRequestScrap = (): UseRequestScrapResult => {
  const [result, setResult] = useState<ScrapResult[] | null>(null);
  const [screenShotDir, setScreenShotDir] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestScrap = async (hashTags: HashTag[], urls: URL[]) => {
    try {
      setIsLoading(true);
      const { directory, result } = await invokeWithCustomErrors(() =>
        window.api.SCRAP(hashTags, urls)
      );
      setResult(result);
      setScreenShotDir(directory);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    requestScrap,
    screenShotDir,
    result,
    isLoading,
  };
};
