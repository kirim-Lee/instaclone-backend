export function getHashtags(caption?: string) {
  const hashtags = /#[\w]+/g;
  return caption?.match(hashtags) || [];
}
