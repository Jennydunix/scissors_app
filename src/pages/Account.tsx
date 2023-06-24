/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React, {
  useState,
  Fragment,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  Divider,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import { nanoid } from 'nanoid';

import firebase from 'firebase/compat/app';
// eslint-disable-next-line import/no-extraneous-dependencies
import copy from 'copy-to-clipboard';
import NavBar from './NavBar';
import LinkCard from './LinkCard';
import ScissorURLModal from './ScissorURLModal';
import { firestore, auth } from '../firebase';

interface Link {
  id: string;
  createdAt: Date;
  name: string;
  longUrl: string;
  shortCode: string;
  totalClick: number;
}
// const dummyData: Link[] = [
//   {
//     id: '31r08ns0fan',
//     createdAt: new Date(),
//     name: 'My website',
//     longUrl: 'https://google.com',
//     shortCode: 'masdo',
//     totalClick: 313,
//   },
//   {
//     id: '34u09oj0pan',
//     createdAt: new Date(),
//     name: 'E-book',
//     longUrl: 'https://drive.google.com/dunix97',
//     shortCode: 'jenny',
//     totalClick: 26,
//   },
//   {
//     id: '34u08oj0kan',
//     createdAt: new Date(),
//     name: 'PDF',
//     longUrl: 'https://drive.google.com/dunix97',
//     shortCode: 'pdf',
//     totalClick: 90,
//   },
// ];

const Account: React.FC = () => {
  const [fetchingLinks, setFetchingLinks] = useState(false);
  const [newLinkToaster, setNewLinkToaster] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [links, setLinks] = useState<Link[]>([]);
  const userUid = auth.currentUser?.uid;
  const linksPathRef = useMemo(
    () => firestore.collection('users').doc(userUid).collection('links'),
    [userUid]
  );

  const handleCreateShortenLink = async (
    name: string,
    longUrl: string
  ): Promise<void> => {
    const link = {
      name,
      longUrl:
        longUrl.includes('http://') || longUrl.includes('https://')
          ? longUrl
          : `http://${longUrl}`,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      shortCode: nanoid(6),
      totalClick: 0,
    };

    const resp = await linksPathRef.add(link);

    setLinks((prevLinks) => [
      ...prevLinks,
      { ...link, createdAt: new Date(), id: resp.id, longUrl: link.longUrl },
    ]);
    setOpenModal(false);
  };

  useEffect(() => {
    const fetchLink = async () => {
      const snapshot = await linksPathRef.get();

      const tempLinks: Link[] = [];
      snapshot.forEach((doc) => {
        const createdAt = doc.data().createdAt.toDate();
        tempLinks.push({
          ...doc.data(),
          id: doc.id,
          createdAt,
        } as Link);
      });
      setLinks(tempLinks);
      setTimeout(() => setFetchingLinks(false), 1000);
    };

    fetchLink();
  }, [linksPathRef]);

  const handleDeleteLink = useCallback(
    async (linkDocID: string): Promise<void> => {
      // eslint-disable-next-line no-alert
      if (window.confirm('Are you sure you want to delete this link?')) {
        await linksPathRef.doc(linkDocID).delete();
        setLinks((oldLinks) =>
          oldLinks.filter((link) => link.id !== linkDocID)
        );
      }
    },
    [linksPathRef]
  );

  const handleCopyLink = useCallback((shortUrl: string) => {
    copy(shortUrl);
    setNewLinkToaster(true);
  }, []);

  // const dummyFunction = useCallback(() => {
  //   console.log('dummy function');
  // }, []);

  return (
    <>
      <Snackbar
        open={newLinkToaster}
        onClose={() => setNewLinkToaster(false)}
        autoHideDuration={2000}
        message="link copied to the clipboard"
      />
      {openModal && (
        <ScissorURLModal
          createShortenLink={handleCreateShortenLink}
          handleClose={() => setOpenModal(false)}
        />
      )}
      <NavBar />
      <Box mt={{ xs: 3, sm: 5 }} p={{ xs: 2, sm: 0 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8}>
            <Box mb={5} display="flex">
              <Box mr={3}>
                <Typography variant="h4">Links</Typography>
              </Box>
              <Button
                onClick={() => setOpenModal(true)}
                disableElevation
                variant="contained"
              >
                Create new
              </Button>
            </Box>

            {fetchingLinks ? (
              <Box textAlign="center">
                <CircularProgress />
              </Box>
            ) : !links.length ? (
              <Box textAlign="center">
                <img
                  style={{
                    width: '225px',
                    height: 'auto',
                    marginBottom: '24px',
                  }}
                  src="/src/assets/no-link.svg"
                  alt="no links"
                />
                <Typography>You have no links</Typography>
              </Box>
            ) : (
              links
                .sort(
                  (prevLink, nextLink) =>
                    nextLink.createdAt.getTime() - prevLink.createdAt.getTime()
                )
                .map((link, idx) => (
                  <Fragment key={link.id}>
                    <LinkCard
                      key={link.id}
                      {...link}
                      deleteLink={handleDeleteLink}
                      copyLink={handleCopyLink}
                      // dummyFunction={dummyFunction}
                    />

                    {idx !== links.length - 1 && (
                      <Box my={4}>
                        <Divider />
                      </Box>
                    )}
                  </Fragment>
                ))
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Account;
