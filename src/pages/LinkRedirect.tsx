import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Box, Typography } from '@mui/material';
import { firestore, firebase } from '../firebase';

interface LinkData {
  longUrl: string;
  linkID: string;
  userUid: string;
}

function LinkRedirect(): JSX.Element {
  const { shortCode } = useParams<{ shortCode: string }>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLinkDoc = async (): Promise<void> => {
      const linkDoc = await firestore.collection('links').doc(shortCode).get();
      if (linkDoc.exists) {
        const { longUrl, linkID, userUid }: LinkData =
          linkDoc.data() as LinkData;

        await firestore
          .collection('users')
          .doc(userUid)
          .collection('links')
          .doc(linkID)
          .update({
            totalClick: firebase.firestore.FieldValue.increment(1),
          });

        window.location.href = longUrl;
      } else {
        setLoading(false);
      }
    };

    fetchLinkDoc();
  }, [shortCode]);

  if (loading) {
    return (
      <Box mt={10} textAlign="center">
        <CircularProgress />
        <Typography>Redirecting to the link</Typography>
      </Box>
    );
  }

  return (
    <Box mt={10} textAlign="center">
      <Typography>Link is invalid</Typography>
    </Box>
  );
}

export default LinkRedirect;
