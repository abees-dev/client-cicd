import { Button, Container, TextField } from '@mui/material';
import { ChangeEvent, ReactElement, useCallback, useState } from 'react';
import { uploadMultiple } from 'src/api/upload';
import { UploadMultiple } from 'src/components/upload';
import { useCreatePostMutation, useLittenJoinRoomSubscription } from 'src/generated/graphql';
import { useAppSelector } from 'src/redux/hooks';
import { FileType, NextPageWithLayout } from 'src/types';
import Layout from '../../layouts';

const Inbox: NextPageWithLayout = () => {
  const [files, setFiles] = useState<Partial<FileType[]>>([]);

  // const [singleFile, setSingleFile] = useState<Partial<FileType>>({});

  // console.log(singleFile);

  const [content, setContent] = useState('');

  const user = useAppSelector((state) => state.auth.user);

  const onDropMultiple = useCallback(
    (acceptedFiles: FileType[]) => {
      // const file = acceptedFiles[0];

      // setFile(
      //   Object.assign(file, {
      //     preview: URL.createObjectURL(file),
      //   })
      // );

      setFiles((prev) => [
        ...prev,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
      // console.log(
      //   Object.assign(file, {
      //     preview: URL.createObjectURL(file),
      //   })
      // );
      //dependencies
    },
    [setFiles]
  );

  // const ondropSingle = useCallback(
  //   (acceptedFiles: FileType[]) => {
  //     const file = acceptedFiles[0];

  //     setSingleFile(
  //       Object.assign(file, {
  //         preview: URL.createObjectURL(file),
  //       })
  //     );
  //   },
  //   [setSingleFile]
  // );

  const handleRemove = (_file?: FileType) => {
    setFiles((prev) => prev.filter((file) => file !== _file));
  };

  const handleOnchange = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const [createPost, _] = useCreatePostMutation();

  const handlePost = async () => {
    try {
      const form = new FormData();
      files.forEach((file) => form.append('files', file as Blob));
      const res = await uploadMultiple(form);
      const listImage = res.uploads;
      await createPost({
        variables: {
          postInput: {
            content,
            user: user,
          },
          imageInput: listImage,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <TextField label="Content" fullWidth sx={{ mb: 2 }} onChange={handleOnchange} />
      {/* <UploadSingle onDrop={ondropSingle} file={singleFile} sx={{ height: 200 }} /> */}
      <UploadMultiple sx={{ height: 200 }} files={files} onDrop={onDropMultiple} showPreview onRemove={handleRemove} />
      <Button variant="contained" onClick={handlePost}>
        Post
      </Button>
    </Container>
  );
};

Inbox.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Inbox;
