const setFocus = ({
  parentRef,
  id,
}: {
  parentRef: React.MutableRefObject<HTMLDivElement | null>;
  id: string;
}) => {
  const nodes = parentRef && parentRef.current?.querySelector(id);

  if (!nodes || !nodes.firstChild) {
    return;
  }

  const element = nodes.firstChild as HTMLElement;
  element.focus();
};

export { setFocus };
