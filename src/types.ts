export type TodoItemType = {
    id: number;
    text: string;
    completed: boolean;
  }
export enum FilterType {
    all = 'all',
    completed = 'completed',
    active = 'active',
  }