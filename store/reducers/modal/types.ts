enum ModalStoreBlocks {
  showAuthorizationWarning = 'showAuthorizationWarning',
}

type ModalStore = {
  [ModalStoreBlocks.showAuthorizationWarning]: boolean;
};

export type { ModalStore };
