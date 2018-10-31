import { justifyYouTubeUrl } from './justify-youtube-Url';

describe('justifyYouTubeUrl', () => {
  it('', () => {
    const url = 'https://www.youtube.com/watch?v=UsK4UwBo_yw';
    const expected = url;
    const result = justifyYouTubeUrl(url);
    expect(result).toBe(expected);
  });

  it('', () => {
    const url = 'http://www.youtube.com/watch?v=UsK4UwBo_yw';
    const expected = 'https://www.youtube.com/watch?v=UsK4UwBo_yw';
    const result = justifyYouTubeUrl(url);
    expect(result).toBe(expected);
  });

  it('', () => {
    const url = '/watch?v=UsK4UwBo_yw';
    const expected = 'https://www.youtube.com/watch?v=UsK4UwBo_yw';
    const result = justifyYouTubeUrl(url);
    expect(result).toBe(expected);
  });
});
