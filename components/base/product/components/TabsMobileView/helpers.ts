const scrollNodeToViewbox = (node: Element | null) =>
  node?.scrollIntoView({
    block: 'start',
    inline: 'nearest',
    behavior: 'smooth',
  });

export { scrollNodeToViewbox };
