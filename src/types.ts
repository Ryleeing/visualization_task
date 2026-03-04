export interface Inclusion {
  id: string;
  parent_id?: string;
  name: string;
  radius: number;
  type: 'bubble' | 'crack' | 'scratch';
}