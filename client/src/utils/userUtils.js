export function normalizeUser(userLike) {
  if (!userLike) return null;

  // 如果是嵌套結構 { user: {...} }，提取內層
  if (userLike.user && typeof userLike.user === 'object') {
    return userLike.user;
  }

  // 如果已經是扁平結構，直接返回
  if (userLike._id || userLike.id) {
    return userLike;
  }

  return null;
}
