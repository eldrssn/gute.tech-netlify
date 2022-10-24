type ReviewItem = {
  userName: string;
  date: string;
  userPhoto: string;
  rating: Record<string, number>;
  header: string;
  text: string;
  id: number;
};

type ReviewProps = { item: ReviewItem };

export type { ReviewItem, ReviewProps };
