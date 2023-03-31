// @mui
import { Card, Skeleton, Stack } from '@mui/material';

// ----------------------------------------------------------------------

export default function SkeletonCardItem() {
  return (
    <Card>
      <Skeleton variant="rectangular" sx={{ paddingTop: '100%' }} />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Skeleton variant="text" sx={{ width: 0.3 }} />
        <Stack direction="row" alignItems="center" gap={1}>
          <Skeleton variant="text" sx={{ width: 0.5 }} />
          <Skeleton variant="text" sx={{ width: 0.1 }} />
        </Stack>
      </Stack>
    </Card>
  );
}
