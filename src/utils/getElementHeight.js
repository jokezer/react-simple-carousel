function getPadding(element) {
  if (!getComputedStyle) return [25, 25];

  const { paddingTop, paddingBottom } = getComputedStyle(element.parentNode);
  return [parseFloat(paddingTop), parseFloat(paddingBottom)];
}

export default function getElementHeight(element) {
  const { offsetHeight } = element;
  const [paddingTop, paddingBottom] = getPadding(element);

  return offsetHeight + paddingTop + paddingBottom;
}
