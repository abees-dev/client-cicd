import { Avatar, Button, Stack, styled, Tooltip } from '@mui/material';
import IconAnimate from 'src/components/animate/IconAnimate';
import IconButtonAnimate from 'src/components/animate/IconButtonAnimate';
import Iconify from 'src/components/Iconify';
import {
  CurrentLike,
  Post,
  PostLikeMutationResponse,
  useCreatePostLikeMutation,
  User,
  useUnlikeCommentPostMutation,
} from 'src/generated/graphql';
import { useAppSelector } from 'src/redux/hooks';

interface ListIconType {
  icon: string;
  value: string;
  color?: string;
}

const LIST_ICON: ListIconType[] = [
  {
    icon: 'ant-design:like-filled',
    value: 'like',
    color: 'info.main',
  },
  {
    icon: 'codicon:heart-filled',
    value: 'heart',
    color: 'error.main',
  },
  {
    icon: 'twemoji:grinning-squinting-face',
    value: 'grinning',
  },
  {
    icon: 'twemoji:sad-but-relieved-face',
    value: 'sad',
  },
  {
    icon: 'twemoji:zany-face',
    value: 'zany',
  },
];

interface PostSocialActionProp {
  post?: Post;
  currentLike?: CurrentLike;
  handleLikeSuccess: (currentLike: CurrentLike) => void;
  handleUnlike: () => void;
}

export default function PostSocialAction({ post, currentLike, handleLikeSuccess, handleUnlike }: PostSocialActionProp) {
  const user = useAppSelector((state) => state.auth.user);

  const [unLikePost] = useUnlikeCommentPostMutation();
  const [createPostLike] = useCreatePostLikeMutation();

  const handleToggleLike = async () => {
    if (currentLike?.like) {
      await unLikePost({
        variables: {
          likeInput: {
            userId: String(user?.id),
            postId: String(post?.id),
          },
        },
      });
      handleUnlike();
    } else {
      const { data } = await createPostLike({
        variables: {
          likeInput: {
            post,
            user,
            type: 'like',
          },
        },
      });
      handleLikeSuccess({ like: true, type: data?.createPostLike.likes?.type });
    }
  };

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1} mb={1}>
      <Tooltip
        placement="top"
        title={
          <TooltipLikeItem
            user={user}
            post={post}
            handleLikeSuccess={handleLikeSuccess}
            typeCurrent={String(currentLike?.type)}
          />
        }
        PopperProps={{
          sx: {
            mb: 0,
          },
        }}
      >
        <Button
          onClick={handleToggleLike}
          variant="text"
          color={currentLike?.like ? 'primary' : 'inherit'}
          fullWidth
          startIcon={<HashIcon name={currentLike?.type || ''} />}
        >
          {currentLike?.type ? currentLike.type : 'Like'}
        </Button>
      </Tooltip>
      <Button variant="text" color="inherit" fullWidth startIcon={<Iconify icon="akar-icons:comment" />}>
        comments
      </Button>
      <Button variant="text" color="inherit" fullWidth startIcon={<Iconify icon="icon-park-outline:share-two" />}>
        share
      </Button>
      <Button
        variant="text"
        color="inherit"
        startIcon={<Avatar sx={{ width: 24, height: 24 }} src={user?.avatar ? user.avatar : ''} />}
        endIcon={<Iconify icon="bi:caret-down-fill" sx={{ width: 12, height: 12 }} />}
      />
    </Stack>
  );
}

const RootItemStyled = styled('div')(({ theme }) => ({
  padding: theme.spacing(0.5),
  display: 'flex',
  gap: theme.spacing(1),
}));

interface TooltipIemProp {
  user?: User;
  post?: Post;
  handleLikeSuccess: (currentLike: CurrentLike) => void;
  typeCurrent?: string;
}

function TooltipLikeItem({ user, post, handleLikeSuccess, typeCurrent }: TooltipIemProp) {
  const [createPostLike] = useCreatePostLikeMutation();

  const handleLikePost = async (type: string) => {
    try {
      if (type === typeCurrent) return;
      const { data } = await createPostLike({
        variables: {
          likeInput: {
            post,
            user,
            type,
          },
        },
      });

      const { code, currentLike, likes } = data?.createPostLike as PostLikeMutationResponse;

      if (code === 201) {
        handleLikeSuccess({ like: true, type: likes?.type });
      } else {
        console.log(currentLike);
        handleLikeSuccess(currentLike as CurrentLike);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RootItemStyled>
      {LIST_ICON.slice(0, 2).map(({ icon, color, value }) => (
        <IconButtonAnimate
          key={icon}
          size="medium"
          sx={{ bgcolor: color, borderRadius: '100%' }}
          onClick={() => handleLikePost(value)}
        >
          <Iconify icon={icon} sx={{ width: 12, height: 12, color: (theme) => theme.palette.common.white }} />
        </IconButtonAnimate>
      ))}

      {LIST_ICON.slice(2, 5).map(({ icon, value }) => (
        <IconAnimate key={icon} sx={{ width: 28, height: 28 }} onClick={() => handleLikePost(value)}>
          <Iconify icon={icon} sx={{ width: '100%', height: '100%' }} />
        </IconAnimate>
      ))}
    </RootItemStyled>
  );
}

function HashIcon({ name }: { name?: string }) {
  const existIcon = LIST_ICON.find((item) => item.value === name);

  if (!name || !existIcon) {
    return <Iconify icon="ant-design:like-outlined" />;
  }
  return (
    <Iconify
      icon={existIcon.icon}
      sx={{
        color: existIcon.value === 'like' ? 'info.main' : 'error.main',
      }}
    />
  );
}
