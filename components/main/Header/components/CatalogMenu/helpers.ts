const setFocus = ({
  ref,
  id,
  choosenCategoryIndex,
}: {
  ref: React.MutableRefObject<HTMLDivElement | null>;
  id: string;
  choosenCategoryIndex?: number;
}) => {
  const nodes = ref && ref.current?.querySelector(id);

  if (!nodes || !nodes.firstChild) {
    return;
  }

  const element = choosenCategoryIndex
    ? (nodes.children[choosenCategoryIndex] as HTMLElement)
    : (nodes.firstChild as HTMLElement);

  element.focus();
};

export { setFocus };
