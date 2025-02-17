export interface Post {
  id: number;
  userId: number;
  animal: string;
  notes: string;
  conservationNotes: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  upvotes: number;
}