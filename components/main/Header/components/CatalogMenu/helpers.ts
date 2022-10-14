const setFocus = ({
  ref,
  id,
}: {
  ref: React.MutableRefObject<HTMLDivElement | null>;
  id: string;
}) => {
  const nodes = ref && ref.current?.querySelector(id);

  if (!nodes || !nodes.firstChild) {
    return;
  }

  const element = nodes.firstChild as HTMLElement;
  element.focus();
};

export { setFocus };
