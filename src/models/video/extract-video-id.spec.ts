import { extractVideoId } from './extract-video-id';

describe('extractVideoId', () => {
  it('', () => {
    const expected = 'UhFzm8AMJY8';
    const url = `https://www.youtube.com/watch?v=${expected}`;
    const result = extractVideoId(url);
    expect(result).toBe(expected);
  });

  it('', () => {
    const expected = 'UhFzm8AMJY8';
    const url = `https://www.youtube.com/watch?v=${expected}&foo=bar`;
    const result = extractVideoId(url);
    expect(result).toBe(expected);
  });

  it('', () => {
    const expected = 'UhFzm8AMJY8';
    const url = `/watch?v=${expected}&foo=bar`;
    const result = extractVideoId(url);
    expect(result).toBe(expected);
  });

  it('', () => {
    const expected = 'UhFzm8AMJY8';
    const url = `?v=${expected}&foo=bar`;
    const result = extractVideoId(url);
    expect(result).toBe(expected);
  });
});
