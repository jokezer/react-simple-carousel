function getPadding(element) {
  if (!getComputedStyle) return [25, 25];

  const { paddingTop, paddingBottom } = getComputedStyle(element);
  return [parseFloat(paddingTop), parseFloat(paddingBottom)];
}

export default function getElementHeight(element) {
  const { offsetHeight } = element;
  const [paddingTop, paddingBottom] = getPadding(element);
  console.log(element, paddingTop, paddingBottom, offsetHeight);

  return offsetHeight + paddingTop + paddingBottom;
}