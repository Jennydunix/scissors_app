/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
// eslint-disable-next-line import/no-duplicates
import React from 'react';
// eslint-disable-next-line import/no-duplicates
import { memo } from 'react';
import { Typography, Box, Button, Hidden } from '@mui/material';
import { BarChart as ChartIcon } from '@mui/icons-material';
import format from 'date-fns/format';

interface LinkCardProps {
  id: string;
  createdAt: Date;
  name: string;
  longUrl: string;
  shortCode: string;
  totalClick: number;
  deleteLink: (linkDocID: string) => Promise<void>;
  copyLink: (shortUrl: string) => void;
}

const LinkCard: React.FC<LinkCardProps> = ({
  id,
  createdAt,
  name,
  longUrl,
  shortCode,
  totalClick,
  deleteLink,
  copyLink,
}) => {
  const shortURL = `${window.location.host}/${shortCode}` as string;
  console.log(shortCode);
  console.log('link card rendered');
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box width="50%">
        <Typography color="textSecondary" variant="overline">
          Created at {format(createdAt, 'd MMM, HH:mm')}
        </Typography>
        <Box my={2}>
          <Typography style={{ marginBottom: '5px' }} variant="h5">
            {name}
          </Typography>
          <Typography style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {longUrl}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography color="primary">{shortURL}</Typography>
          <Box mx={2}>
            <Button
              color="primary"
              size="small"
              variant="outlined"
              onClick={() => copyLink(shortURL)}
            >
              Copy
            </Button>
          </Box>
          <Button
            onClick={() => deleteLink(id)}
            color="secondary"
            size="small"
            variant="contained"
            disableElevation
          >
            Delete
          </Button>
        </Box>
      </Box>

      <Box>
        <Box display="flex" justifyContent="center">
          <Typography>{totalClick}</Typography>
          <ChartIcon />
        </Box>
        <Hidden only="xs">
          <Typography variant="overline">Total Clicks</Typography>
        </Hidden>
      </Box>
    </Box>
  );
};

export default memo(LinkCard);
