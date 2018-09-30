const invalidPattern = /\W+/g;
export const cssify = name => {
  if (!name) {
    return '';
  }

  let className = name.toLowerCase();
  className = className.replace(invalidPattern, '-');
  return className;
}
