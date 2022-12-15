type ReviewItem = {
  first_name: string;
  last_name: string;
  created_at: string;
  grade: number;
  comment: string;
};

type ReviewProps = { item: ReviewItem };

type ReviewsBoxProps = {
  reviewsList?: ReviewItem[];
};

type PaginationProps = {
  pageCount: number;
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export type { ReviewItem, ReviewProps, ReviewsBoxProps, PaginationProps };
