// @mui

import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import BookingCard from "./BookingCard";
import SkeletonCardItem from "./SkeletonCardItem";

type Props = {
  data: IBookingProduct[];
  loading: boolean;
  onLoadmore: () => void;
};

export default function BookingList({ data, loading, onLoadmore }: Props) {
  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
        }}
      >
        {(loading ? [...Array(12)] : data).map((product, index) =>
          product ? (
            <BookingCard key={product.id} product={product} />
          ) : (
            <SkeletonCardItem key={index} />
          )
        )}

      </Box>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>

        <LoadingButton
          color='inherit'
          variant="contained"
          size="small"
          onClick={onLoadmore}
        >
          Load more equipment...
        </LoadingButton>
      </Box>
    </>
  );
}
