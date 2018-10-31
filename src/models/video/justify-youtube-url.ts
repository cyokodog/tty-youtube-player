import { videoSiteDomain, videoSiteDomainRegExp } from './definition';

export const justifyYouTubeUrl = (url: string): string => {
  return videoSiteDomain + url.replace(videoSiteDomainRegExp, '');
};
