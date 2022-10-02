import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Container, Stack, styled, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { uploadMultiple } from 'src/api/upload';
import { FormProvider } from 'src/components/hook-form';
import RHFTextArea from 'src/components/hook-form/RHFTextArea';
import { RHFUploadMultiple } from 'src/components/hook-form/RHFUpload';
import Iconify from 'src/components/Iconify';
import MyAvatar from 'src/components/MyAvatar';
import { Post, useCreatePostMutation } from 'src/generated/graphql';
import { useAppSelector } from 'src/redux/hooks';
import { FileType } from 'src/types';
import * as Yup from 'yup';
import PostAction from './PostAction';

const RootStyled = styled('div')(({}) => ({}));

interface PostValues {
  content: string;
  files?: FileType[];
}

interface IAction {
  addImage: boolean;
  value: string;
}

const PostSchema = Yup.object().shape({
  content: Yup.string(),
  files: Yup.mixed(),
});

interface PostFormProps {
  handleSuccess: (post: Post) => void;
}

export default function PostCreateForm({ handleSuccess }: PostFormProps) {
  const user = useAppSelector((state) => state.auth.user);

  const [action, setAction] = useState<IAction>({
    addImage: false,
    value: '',
  });

  const defaultValues: PostValues = {
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, cumque cupiditate, aut neque sed   dolore et doloremque quis, voluptatem blanditiis eveniet voluptates. Facere, dignissimos soluta? Quodexercitationem nam eaque fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium adautem architecto, doloribus nulla velit consequuntur ipsa nemo ipsam debitis, cum animi recusandae culparerum cumque possimus quis reiciendis voluptate.',
    files: [],
  };

  const methods = useForm({
    resolver: yupResolver(PostSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isSubmitting },
  } = methods;

  const handleOndrop = useCallback(
    (acceptedFiles: FileType[]) => {
      return setValue('files', [
        ...(getValues('files') as Array<FileType>),
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
    [setValue]
  );

  const [createPost, _] = useCreatePostMutation();

  const onSubmit = async (postValue: PostValues) => {
    try {
      const formData = new FormData();
      postValue.files?.map((file) => formData.append('files', file));

      const listImage = await uploadMultiple(formData);

      const { data } = await createPost({
        variables: {
          postInput: {
            content: postValue.content,
            user: user,
          },
          imageInput: listImage.uploads,
        },
      });

      const newPost = data?.createPost.post;
      handleSuccess(newPost as Post);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectAction = (value: string) => {
    setAction((prev) => ({ ...prev, addImage: value === 'add' }));
  };

  return (
    <RootStyled>
      <Container>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack mt={2} direction="row" spacing={2} alignItems="center">
            <MyAvatar sx={{ width: 45, height: 45 }} />
            <Stack spacing={0.2}>
              <Typography variant="subtitle1">{`${user?.firstName} ${user?.lastName}`}</Typography>
              <Button
                size="small"
                color="inherit"
                variant="contained"
                sx={{ py: 0 }}
                startIcon={<Iconify icon="material-symbols:public" sx={{ width: 15, height: 15 }} />}
                endIcon={<Iconify icon="bi:caret-down-fill" sx={{ width: 12, height: 12 }} />}
              >
                Public
              </Button>
            </Stack>
          </Stack>

          <Stack mt={2}>
            <RHFTextArea
              name="content"
              sx={{
                border: 'none',
              }}
              placeholder="What are you thinking?"
              minRows={3}
            />
            {(action.addImage || !isEmpty(watch('files'))) && (
              <RHFUploadMultiple name="files" onDrop={handleOndrop} singlePreview />
            )}
          </Stack>
          <PostAction handleClick={handleSelectAction} />
          <LoadingButton loading={isSubmitting} type="submit" fullWidth size="large" variant="contained">
            Post
          </LoadingButton>
        </FormProvider>
      </Container>
    </RootStyled>
  );
}
