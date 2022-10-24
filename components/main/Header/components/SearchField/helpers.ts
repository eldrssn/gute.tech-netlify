const checkResultList = (ref: React.MutableRefObject<HTMLDivElement | null>) =>
  Boolean(ref?.current?.children.item(1));

export { checkResultList };
