const scrollNodeToViewbox = (node: Element | null) =>
  node?.scrollIntoView({
    block: 'nearest',
    inline: 'nearest',
    behavior: 'smooth',
  });

export { scrollNodeToViewbox };
