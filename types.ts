
export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Detection {
  label: string;
  gender?: 'Male' | 'Female' | 'Unknown';
  box: BoundingBox;
}
