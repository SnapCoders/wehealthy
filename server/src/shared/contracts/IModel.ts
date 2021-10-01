export type IModel<T> = Omit<
  T,
  'hasId' | 'recover' | 'reload' | 'remove' | 'save' | 'softRemove'
>;
