import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSONObject: any;
};

export type AcceptFriendInput = {
  addressee: Scalars['JSONObject'];
  id: Scalars['String'];
  type: Scalars['String'];
};

export type AddFriendInput = {
  addressee: Scalars['JSONObject'];
  requester: Scalars['JSONObject'];
  type: Scalars['String'];
};

export type AddFriendMutationResponse = BaseResponse & {
  __typename?: 'AddFriendMutationResponse';
  addressee?: Maybe<User>;
  code?: Maybe<Scalars['Float']>;
  message?: Maybe<Scalars['String']>;
};

export type AllCommentResponse = BaseResponse & {
  __typename?: 'AllCommentResponse';
  code?: Maybe<Scalars['Float']>;
  comment?: Maybe<Array<Comment>>;
  message?: Maybe<Scalars['String']>;
};

export type AllPostResponse = QueryResponse & {
  __typename?: 'AllPostResponse';
  limit?: Maybe<Scalars['Float']>;
  page?: Maybe<Scalars['Float']>;
  perPage?: Maybe<Scalars['Float']>;
  posts?: Maybe<Array<Post>>;
  skip?: Maybe<Scalars['Float']>;
  totalCount?: Maybe<Scalars['Float']>;
  totalPage?: Maybe<Scalars['Float']>;
};

export type BaseResponse = {
  code?: Maybe<Scalars['Float']>;
  message?: Maybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  author?: Maybe<User>;
  createdAt: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  message: Scalars['String'];
  post: Post;
  reply?: Maybe<Array<ReplyCommentPost>>;
  updatedAt: Scalars['String'];
};

export type CommentInput = {
  author: Scalars['JSONObject'];
  comment?: InputMaybe<Scalars['JSONObject']>;
  message: Scalars['String'];
  post?: InputMaybe<Scalars['JSONObject']>;
  type?: InputMaybe<Scalars['String']>;
};

export type CommentListResponse = QueryResponse & {
  __typename?: 'CommentListResponse';
  comment?: Maybe<Array<Comment>>;
  limit?: Maybe<Scalars['Float']>;
  page?: Maybe<Scalars['Float']>;
  perPage?: Maybe<Scalars['Float']>;
  skip?: Maybe<Scalars['Float']>;
  totalCount?: Maybe<Scalars['Float']>;
  totalPage?: Maybe<Scalars['Float']>;
};

export type CommentPayload = {
  __typename?: 'CommentPayload';
  commentId?: Maybe<Scalars['String']>;
  data?: Maybe<Comment>;
  room: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type CommentResponse = BaseResponse & {
  __typename?: 'CommentResponse';
  code?: Maybe<Scalars['Float']>;
  comment?: Maybe<Comment>;
  message?: Maybe<Scalars['String']>;
  reply?: Maybe<ReplyCommentPost>;
};

export type CurrentLike = {
  __typename?: 'CurrentLike';
  like?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
};

export type FriendNotificationResponse = {
  __typename?: 'FriendNotificationResponse';
  addressee?: Maybe<Scalars['String']>;
  message: Scalars['String'];
  requester?: Maybe<User>;
};

export type FriendShipRecommendResponse = QueryResponse & {
  __typename?: 'FriendShipRecommendResponse';
  limit?: Maybe<Scalars['Float']>;
  page?: Maybe<Scalars['Float']>;
  perPage?: Maybe<Scalars['Float']>;
  skip?: Maybe<Scalars['Float']>;
  totalCount?: Maybe<Scalars['Float']>;
  totalPage?: Maybe<Scalars['Float']>;
  users?: Maybe<Array<User>>;
};

export type FriendShipRequestInputQuery = {
  addressee: Scalars['String'];
};

export type FriendShipRequestResponse = QueryResponse & {
  __typename?: 'FriendShipRequestResponse';
  friendRequest?: Maybe<Array<Friendship>>;
  limit?: Maybe<Scalars['Float']>;
  page?: Maybe<Scalars['Float']>;
  perPage?: Maybe<Scalars['Float']>;
  skip?: Maybe<Scalars['Float']>;
  totalCount?: Maybe<Scalars['Float']>;
  totalPage?: Maybe<Scalars['Float']>;
};

export type Friendship = {
  __typename?: 'Friendship';
  accepted: Scalars['Boolean'];
  addressee: User;
  createdAt: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  requester: User;
  updatedAt: Scalars['String'];
};

export type FriendshipPayload = {
  __typename?: 'FriendshipPayload';
  data?: Maybe<Notification>;
  room: Scalars['String'];
};

export type HoverCardResponse = {
  __typename?: 'HoverCardResponse';
  isFriend: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type Image = {
  __typename?: 'Image';
  createdAt: Scalars['String'];
  fileName: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  post: Post;
  type: Scalars['String'];
  updatedAt: Scalars['String'];
  url: Scalars['String'];
};

export type ImageInput = {
  fileName: Scalars['String'];
  type: Scalars['String'];
  url: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Model = {
  __typename?: 'Model';
  createdAt: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addFriendMutation: AddFriendMutationResponse;
  createComment: Scalars['Boolean'];
  createPost: PostResponse;
  createPostLike: PostLikeMutationResponse;
  login: UserResponse;
  logout: UserLogoutResponse;
  markAsRead: Scalars['Boolean'];
  mutationTest: SocketReturn;
  refreshToken: UserResponse;
  register: UserResponse;
  replyComment: Scalars['Boolean'];
  unLikePost: UnlikePostMutationResponse;
  updateProfile: UpdateUserProfileResponse;
  uploadAvatar: Scalars['Boolean'];
};


export type MutationAddFriendMutationArgs = {
  data: AddFriendInput;
};


export type MutationCreateCommentArgs = {
  commentInput: CommentInput;
  room: Scalars['String'];
};


export type MutationCreatePostArgs = {
  imageInput: Array<ImageInput>;
  postInput: PostInput;
};


export type MutationCreatePostLikeArgs = {
  likeInput: PostLikeMutationInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationMarkAsReadArgs = {
  notificationInput: NotificationInput;
};


export type MutationMutationTestArgs = {
  name: Scalars['String'];
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationReplyCommentArgs = {
  replyInput: ReplyInput;
  room: Scalars['String'];
};


export type MutationUnLikePostArgs = {
  likeInput: PostLikeQueryInput;
};


export type MutationUpdateProfileArgs = {
  data: UserProfileInput;
};


export type MutationUploadAvatarArgs = {
  url: Scalars['String'];
  userId: Scalars['String'];
};

export type Notification = {
  __typename?: 'Notification';
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  owner: User;
  read: Scalars['Boolean'];
  requester: User;
  type: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type NotificationInput = {
  notificationId?: InputMaybe<Scalars['String']>;
  ownerId?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
};

export type NotificationQueryResponse = QueryResponse & {
  __typename?: 'NotificationQueryResponse';
  limit?: Maybe<Scalars['Float']>;
  notifications?: Maybe<Array<Notification>>;
  page?: Maybe<Scalars['Float']>;
  perPage?: Maybe<Scalars['Float']>;
  skip?: Maybe<Scalars['Float']>;
  totalCount?: Maybe<Scalars['Float']>;
  totalPage?: Maybe<Scalars['Float']>;
  totalUnread: Scalars['Float'];
};

export type Post = {
  __typename?: 'Post';
  caption: Scalars['String'];
  checking: Scalars['String'];
  comment: Array<Comment>;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  image: Array<Image>;
  like?: Maybe<Array<PostLike>>;
  status: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
  visible: Scalars['String'];
};

export type PostInput = {
  caption?: InputMaybe<Scalars['String']>;
  checking?: InputMaybe<Scalars['String']>;
  content: Scalars['String'];
  status?: InputMaybe<Scalars['String']>;
  user: Scalars['JSONObject'];
  visible?: InputMaybe<Scalars['String']>;
};

export type PostLike = {
  __typename?: 'PostLike';
  createdAt: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  post: User;
  type: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
};

export type PostLikeMutationInput = {
  post: Scalars['JSONObject'];
  type?: InputMaybe<Scalars['String']>;
  user: Scalars['JSONObject'];
};

export type PostLikeMutationResponse = BaseResponse & {
  __typename?: 'PostLikeMutationResponse';
  code?: Maybe<Scalars['Float']>;
  currentLike?: Maybe<CurrentLike>;
  likes?: Maybe<PostLike>;
  message?: Maybe<Scalars['String']>;
};

export type PostLikeQueryInput = {
  postId: Scalars['String'];
  type?: InputMaybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type PostLikeQueryResponse = BaseResponse & {
  __typename?: 'PostLikeQueryResponse';
  code?: Maybe<Scalars['Float']>;
  currentLike?: Maybe<CurrentLike>;
  likes?: Maybe<Array<PostLike>>;
  message?: Maybe<Scalars['String']>;
  totalLike?: Maybe<Scalars['Float']>;
};

export type PostResponse = BaseResponse & {
  __typename?: 'PostResponse';
  code?: Maybe<Scalars['Float']>;
  message?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
};

export type Query = {
  __typename?: 'Query';
  comments: CommentListResponse;
  friendShipRecommend: FriendShipRecommendResponse;
  friendWaiting: FriendShipRequestResponse;
  getCurrentUser: User;
  getFriendRequest: FriendShipRequestResponse;
  getLikeByPost: PostLikeQueryResponse;
  getNotification: NotificationQueryResponse;
  getUserNotCurrent: UserNotCurrentResponse;
  hoverCard: HoverCardResponse;
  postsQuery: AllPostResponse;
  users: Scalars['String'];
};


export type QueryCommentsArgs = {
  postId: Scalars['String'];
  query?: InputMaybe<QueryInput>;
};


export type QueryFriendShipRecommendArgs = {
  query?: InputMaybe<QueryInput>;
  userId: Scalars['String'];
};


export type QueryFriendWaitingArgs = {
  query?: InputMaybe<QueryInput>;
  userId: Scalars['String'];
};


export type QueryGetCurrentUserArgs = {
  userId: Scalars['String'];
};


export type QueryGetFriendRequestArgs = {
  query?: InputMaybe<QueryInput>;
  userId: Scalars['String'];
};


export type QueryGetLikeByPostArgs = {
  likeInput: PostLikeQueryInput;
};


export type QueryGetNotificationArgs = {
  ownerId: Scalars['String'];
  query?: InputMaybe<QueryInput>;
};


export type QueryGetUserNotCurrentArgs = {
  userId: Scalars['String'];
};


export type QueryHoverCardArgs = {
  userId: Scalars['String'];
};


export type QueryPostsQueryArgs = {
  query?: InputMaybe<QueryInput>;
  userId?: InputMaybe<Scalars['String']>;
};

export type QueryInput = {
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
  skip?: InputMaybe<Scalars['Float']>;
  take?: InputMaybe<Scalars['Float']>;
};

export type QueryResponse = {
  limit?: Maybe<Scalars['Float']>;
  page?: Maybe<Scalars['Float']>;
  perPage?: Maybe<Scalars['Float']>;
  skip?: Maybe<Scalars['Float']>;
  totalCount?: Maybe<Scalars['Float']>;
  totalPage?: Maybe<Scalars['Float']>;
};

export type RegisterInput = {
  confirmPassword?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type ReplyCommentPost = {
  __typename?: 'ReplyCommentPost';
  author?: Maybe<User>;
  createdAt: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  message: Scalars['String'];
  parent: Comment;
  updatedAt: Scalars['String'];
};

export type ReplyInput = {
  author: Scalars['JSONObject'];
  comment: Scalars['JSONObject'];
  message: Scalars['String'];
};

export type ReplyPayload = {
  __typename?: 'ReplyPayload';
  data?: Maybe<ReplyCommentPost>;
  room: Scalars['String'];
};

export type SocketReturn = {
  __typename?: 'SocketReturn';
  date: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  listJoinCommentPost: CommentPayload;
  listenTest: SocketReturn;
  littenJoinRoomRequest: Notification;
};


export type SubscriptionListJoinCommentPostArgs = {
  room: Scalars['String'];
};


export type SubscriptionListenTestArgs = {
  room: Scalars['String'];
};


export type SubscriptionLittenJoinRoomRequestArgs = {
  room: Scalars['String'];
};

export type UnlikePostMutationResponse = BaseResponse & {
  __typename?: 'UnlikePostMutationResponse';
  code?: Maybe<Scalars['Float']>;
  message?: Maybe<Scalars['String']>;
};

export type UpdateUserProfileResponse = BaseResponse & {
  __typename?: 'UpdateUserProfileResponse';
  code?: Maybe<Scalars['Float']>;
  message?: Maybe<Scalars['String']>;
  profile?: Maybe<UserProfile>;
  user?: Maybe<User>;
};

export type UploadAvatarResponse = BaseResponse & {
  __typename?: 'UploadAvatarResponse';
  code?: Maybe<Scalars['Float']>;
  message?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  comment?: Maybe<Comment>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  githubId?: Maybe<Scalars['String']>;
  googleId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  postLike: Array<PostLike>;
  posts: Array<Post>;
  profile?: Maybe<UserProfile>;
  provider?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
};

export type UserInput = {
  user?: InputMaybe<Scalars['JSONObject']>;
};

export type UserLogoutResponse = BaseResponse & {
  __typename?: 'UserLogoutResponse';
  code?: Maybe<Scalars['Float']>;
  message?: Maybe<Scalars['String']>;
};

export type UserNotCurrentResponse = BaseResponse & {
  __typename?: 'UserNotCurrentResponse';
  code?: Maybe<Scalars['Float']>;
  message?: Maybe<Scalars['String']>;
  users?: Maybe<Array<User>>;
};

export type UserProfile = {
  __typename?: 'UserProfile';
  createdAt: Scalars['String'];
  dayOfBirth: Scalars['String'];
  district: Scalars['String'];
  gender: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  liveAt: Scalars['String'];
  phoneNumber: Scalars['String'];
  province: Scalars['String'];
  story: Scalars['String'];
  thumbnail: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
  ward: Scalars['String'];
};

export type UserProfileInput = {
  dayOfBirth: Scalars['String'];
  district: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  lastName: Scalars['String'];
  liveAt: Scalars['String'];
  phoneNumber: Scalars['String'];
  province: Scalars['String'];
  story: Scalars['String'];
  user?: InputMaybe<Scalars['JSONObject']>;
  ward: Scalars['String'];
};

export type UserQueryInput = {
  id: Scalars['String'];
};

export type UserResponse = BaseResponse & {
  __typename?: 'UserResponse';
  accessToken?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['Float']>;
  message?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', code?: number | null, message?: string | null, accessToken?: string | null, user?: { __typename?: 'User', id?: string | null, email: string, lastName: string, firstName: string, createdAt: string, updatedAt: string, avatar?: string | null } | null } };

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', code?: number | null, message?: string | null } };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'UserResponse', code?: number | null, message?: string | null, accessToken?: string | null } };

export type AddFriendRequestMutationVariables = Exact<{
  data: AddFriendInput;
}>;


export type AddFriendRequestMutation = { __typename?: 'Mutation', addFriendMutation: { __typename?: 'AddFriendMutationResponse', code?: number | null, message?: string | null, addressee?: { __typename?: 'User', id?: string | null, firstName: string, lastName: string, avatar?: string | null, createdAt: string, email: string } | null } };

export type MaskAsReadNotificationMutationVariables = Exact<{
  notificationInput: NotificationInput;
}>;


export type MaskAsReadNotificationMutation = { __typename?: 'Mutation', markAsRead: boolean };

export type CreateReplyCommentMutationVariables = Exact<{
  replyInput: ReplyInput;
  room: Scalars['String'];
}>;


export type CreateReplyCommentMutation = { __typename?: 'Mutation', replyComment: boolean };

export type CreateCommentMutationVariables = Exact<{
  room: Scalars['String'];
  commentInput: CommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: boolean };

export type CreatePostMutationVariables = Exact<{
  postInput: PostInput;
  imageInput: Array<ImageInput> | ImageInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostResponse', code?: number | null, message?: string | null, post?: { __typename?: 'Post', id?: string | null, content: string, updatedAt: string, createdAt: string, image: Array<{ __typename?: 'Image', url: string, type: string }>, user: { __typename?: 'User', id?: string | null, firstName: string, lastName: string, avatar?: string | null, createdAt: string } } | null } };

export type CreatePostLikeMutationVariables = Exact<{
  likeInput: PostLikeMutationInput;
}>;


export type CreatePostLikeMutation = { __typename?: 'Mutation', createPostLike: { __typename?: 'PostLikeMutationResponse', code?: number | null, message?: string | null, likes?: { __typename?: 'PostLike', id?: string | null, type: string, createdAt: string, updatedAt: string } | null, currentLike?: { __typename?: 'CurrentLike', like?: boolean | null, type?: string | null } | null } };

export type UnlikeCommentPostMutationVariables = Exact<{
  likeInput: PostLikeQueryInput;
}>;


export type UnlikeCommentPostMutation = { __typename?: 'Mutation', unLikePost: { __typename?: 'UnlikePostMutationResponse', code?: number | null, message?: string | null } };

export type UpdateUserProfileMutationVariables = Exact<{
  data: UserProfileInput;
}>;


export type UpdateUserProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'UpdateUserProfileResponse', code?: number | null, message?: string | null, profile?: { __typename?: 'UserProfile', id?: string | null, gender: string, phoneNumber: string, liveAt: string, province: string, district: string, ward: string, createdAt: string, story: string } | null, user?: { __typename?: 'User', id?: string | null, avatar?: string | null, firstName: string, lastName: string, email: string, createdAt: string } | null } };

export type UploadAvatarMutationVariables = Exact<{
  url: Scalars['String'];
  userId: Scalars['String'];
}>;


export type UploadAvatarMutation = { __typename?: 'Mutation', uploadAvatar: boolean };

export type FriendShipRecommendQueryVariables = Exact<{
  query?: InputMaybe<QueryInput>;
  userId: Scalars['String'];
}>;


export type FriendShipRecommendQuery = { __typename?: 'Query', friendShipRecommend: { __typename?: 'FriendShipRecommendResponse', page?: number | null, perPage?: number | null, totalCount?: number | null, totalPage?: number | null, users?: Array<{ __typename?: 'User', id?: string | null, avatar?: string | null, firstName: string, lastName: string, createdAt: string }> | null } };

export type FriendRequestQueryVariables = Exact<{
  query?: InputMaybe<QueryInput>;
  userId: Scalars['String'];
}>;


export type FriendRequestQuery = { __typename?: 'Query', getFriendRequest: { __typename?: 'FriendShipRequestResponse', page?: number | null, perPage?: number | null, totalCount?: number | null, totalPage?: number | null, friendRequest?: Array<{ __typename?: 'Friendship', id?: string | null, accepted: boolean, createdAt: string, addressee: { __typename?: 'User', id?: string | null }, requester: { __typename?: 'User', avatar?: string | null, firstName: string, lastName: string, id?: string | null } }> | null } };

export type FriendWaitingQueryVariables = Exact<{
  query?: InputMaybe<QueryInput>;
  userId: Scalars['String'];
}>;


export type FriendWaitingQuery = { __typename?: 'Query', friendWaiting: { __typename?: 'FriendShipRequestResponse', page?: number | null, perPage?: number | null, totalCount?: number | null, totalPage?: number | null, friendRequest?: Array<{ __typename?: 'Friendship', accepted: boolean, addressee: { __typename?: 'User', avatar?: string | null, firstName: string, lastName: string, id?: string | null }, requester: { __typename?: 'User', avatar?: string | null, firstName: string, lastName: string, id?: string | null } }> | null } };

export type GetNotificationsQueryVariables = Exact<{
  query?: InputMaybe<QueryInput>;
  ownerId: Scalars['String'];
}>;


export type GetNotificationsQuery = { __typename?: 'Query', getNotification: { __typename?: 'NotificationQueryResponse', totalUnread: number, totalCount?: number | null, totalPage?: number | null, perPage?: number | null, page?: number | null, notifications?: Array<{ __typename?: 'Notification', id?: string | null, content: string, createdAt: string, type: string, read: boolean, requester: { __typename?: 'User', avatar?: string | null, id?: string | null, firstName: string, lastName: string, createdAt: string } }> | null } };

export type GetCommentByPostQueryVariables = Exact<{
  query: QueryInput;
  postId: Scalars['String'];
}>;


export type GetCommentByPostQuery = { __typename?: 'Query', comments: { __typename?: 'CommentListResponse', totalCount?: number | null, totalPage?: number | null, page?: number | null, perPage?: number | null, comment?: Array<{ __typename: 'Comment', id?: string | null, message: string, createdAt: string, updatedAt: string, author?: { __typename?: 'User', id?: string | null, firstName: string, lastName: string, createdAt: string, email: string, avatar?: string | null, updatedAt: string } | null, reply?: Array<{ __typename?: 'ReplyCommentPost', id?: string | null, message: string, createdAt: string, updatedAt: string, author?: { __typename?: 'User', id?: string | null, firstName: string, lastName: string, createdAt: string, email: string, avatar?: string | null, updatedAt: string } | null }> | null, post: { __typename?: 'Post', id?: string | null } }> | null } };

export type GetLikeByPostQueryVariables = Exact<{
  likeInput: PostLikeQueryInput;
}>;


export type GetLikeByPostQuery = { __typename?: 'Query', getLikeByPost: { __typename?: 'PostLikeQueryResponse', code?: number | null, message?: string | null, totalLike?: number | null, likes?: Array<{ __typename?: 'PostLike', id?: string | null, type: string, createdAt: string, updatedAt: string }> | null, currentLike?: { __typename?: 'CurrentLike', like?: boolean | null, type?: string | null } | null } };

export type GetAllPostQueryVariables = Exact<{
  query: QueryInput;
  userId?: InputMaybe<Scalars['String']>;
}>;


export type GetAllPostQuery = { __typename?: 'Query', postsQuery: { __typename?: 'AllPostResponse', page?: number | null, perPage?: number | null, totalCount?: number | null, totalPage?: number | null, posts?: Array<{ __typename?: 'Post', id?: string | null, content: string, createdAt: string, updatedAt: string, image: Array<{ __typename?: 'Image', url: string, id?: string | null, type: string }>, user: { __typename?: 'User', id?: string | null, email: string, lastName: string, firstName: string, avatar?: string | null, createdAt: string }, comment: Array<{ __typename?: 'Comment', id?: string | null }> }> | null } };

export type GetCurrentUserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'User', id?: string | null, avatar?: string | null, firstName: string, lastName: string, createdAt: string, profile?: { __typename?: 'UserProfile', id?: string | null, dayOfBirth: string, district: string, gender: string, liveAt: string, phoneNumber: string, province: string, story: string, updatedAt: string, ward: string } | null } };

export type GetUserNotCurrentQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserNotCurrentQuery = { __typename?: 'Query', getUserNotCurrent: { __typename?: 'UserNotCurrentResponse', code?: number | null, message?: string | null, users?: Array<{ __typename?: 'User', id?: string | null, firstName: string, lastName: string, createdAt: string, avatar?: string | null }> | null } };

export type HoverCardQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type HoverCardQuery = { __typename?: 'Query', hoverCard: { __typename?: 'HoverCardResponse', isFriend: boolean, user?: { __typename?: 'User', id?: string | null, avatar?: string | null, firstName: string, lastName: string, createdAt: string, profile?: { __typename?: 'UserProfile', dayOfBirth: string, gender: string, liveAt: string, phoneNumber: string, province: string, district: string, ward: string } | null } | null } };

export type ListJoinCommentPostSubscriptionVariables = Exact<{
  room: Scalars['String'];
}>;


export type ListJoinCommentPostSubscription = { __typename?: 'Subscription', listJoinCommentPost: { __typename?: 'CommentPayload', commentId?: string | null, type?: string | null, data?: { __typename?: 'Comment', id?: string | null, message: string, createdAt: string, author?: { __typename?: 'User', avatar?: string | null, firstName: string, lastName: string, createdAt: string } | null } | null } };

export type LittenJoinRoomSubscriptionVariables = Exact<{
  room: Scalars['String'];
}>;


export type LittenJoinRoomSubscription = { __typename?: 'Subscription', littenJoinRoomRequest: { __typename?: 'Notification', id?: string | null, content: string, createdAt: string, type: string, requester: { __typename?: 'User', avatar?: string | null, id?: string | null, firstName: string, lastName: string, createdAt: string } } };

export type TestListenSubscriptionVariables = Exact<{
  room: Scalars['String'];
}>;


export type TestListenSubscription = { __typename?: 'Subscription', listenTest: { __typename?: 'SocketReturn', date: string } };


export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(loginInput: $data) {
    code
    message
    user {
      id
      email
      lastName
      firstName
      createdAt
      updatedAt
      avatar
    }
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: RegisterInput!) {
  register(registerInput: $data) {
    code
    message
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation RefreshToken {
  refreshToken {
    code
    message
    accessToken
  }
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const AddFriendRequestDocument = gql`
    mutation addFriendRequest($data: AddFriendInput!) {
  addFriendMutation(data: $data) {
    code
    message
    addressee {
      id
      firstName
      lastName
      avatar
      createdAt
      email
    }
  }
}
    `;
export type AddFriendRequestMutationFn = Apollo.MutationFunction<AddFriendRequestMutation, AddFriendRequestMutationVariables>;

/**
 * __useAddFriendRequestMutation__
 *
 * To run a mutation, you first call `useAddFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFriendRequestMutation, { data, loading, error }] = useAddFriendRequestMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<AddFriendRequestMutation, AddFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddFriendRequestMutation, AddFriendRequestMutationVariables>(AddFriendRequestDocument, options);
      }
export type AddFriendRequestMutationHookResult = ReturnType<typeof useAddFriendRequestMutation>;
export type AddFriendRequestMutationResult = Apollo.MutationResult<AddFriendRequestMutation>;
export type AddFriendRequestMutationOptions = Apollo.BaseMutationOptions<AddFriendRequestMutation, AddFriendRequestMutationVariables>;
export const MaskAsReadNotificationDocument = gql`
    mutation MaskAsReadNotification($notificationInput: NotificationInput!) {
  markAsRead(notificationInput: $notificationInput)
}
    `;
export type MaskAsReadNotificationMutationFn = Apollo.MutationFunction<MaskAsReadNotificationMutation, MaskAsReadNotificationMutationVariables>;

/**
 * __useMaskAsReadNotificationMutation__
 *
 * To run a mutation, you first call `useMaskAsReadNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMaskAsReadNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [maskAsReadNotificationMutation, { data, loading, error }] = useMaskAsReadNotificationMutation({
 *   variables: {
 *      notificationInput: // value for 'notificationInput'
 *   },
 * });
 */
export function useMaskAsReadNotificationMutation(baseOptions?: Apollo.MutationHookOptions<MaskAsReadNotificationMutation, MaskAsReadNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MaskAsReadNotificationMutation, MaskAsReadNotificationMutationVariables>(MaskAsReadNotificationDocument, options);
      }
export type MaskAsReadNotificationMutationHookResult = ReturnType<typeof useMaskAsReadNotificationMutation>;
export type MaskAsReadNotificationMutationResult = Apollo.MutationResult<MaskAsReadNotificationMutation>;
export type MaskAsReadNotificationMutationOptions = Apollo.BaseMutationOptions<MaskAsReadNotificationMutation, MaskAsReadNotificationMutationVariables>;
export const CreateReplyCommentDocument = gql`
    mutation CreateReplyComment($replyInput: ReplyInput!, $room: String!) {
  replyComment(replyInput: $replyInput, room: $room)
}
    `;
export type CreateReplyCommentMutationFn = Apollo.MutationFunction<CreateReplyCommentMutation, CreateReplyCommentMutationVariables>;

/**
 * __useCreateReplyCommentMutation__
 *
 * To run a mutation, you first call `useCreateReplyCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReplyCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReplyCommentMutation, { data, loading, error }] = useCreateReplyCommentMutation({
 *   variables: {
 *      replyInput: // value for 'replyInput'
 *      room: // value for 'room'
 *   },
 * });
 */
export function useCreateReplyCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateReplyCommentMutation, CreateReplyCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReplyCommentMutation, CreateReplyCommentMutationVariables>(CreateReplyCommentDocument, options);
      }
export type CreateReplyCommentMutationHookResult = ReturnType<typeof useCreateReplyCommentMutation>;
export type CreateReplyCommentMutationResult = Apollo.MutationResult<CreateReplyCommentMutation>;
export type CreateReplyCommentMutationOptions = Apollo.BaseMutationOptions<CreateReplyCommentMutation, CreateReplyCommentMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($room: String!, $commentInput: CommentInput!) {
  createComment(room: $room, commentInput: $commentInput)
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      room: // value for 'room'
 *      commentInput: // value for 'commentInput'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreatePostDocument = gql`
    mutation createPost($postInput: PostInput!, $imageInput: [ImageInput!]!) {
  createPost(postInput: $postInput, imageInput: $imageInput) {
    code
    message
    post {
      id
      content
      updatedAt
      createdAt
      image {
        url
        type
        type
      }
      user {
        id
        firstName
        lastName
        avatar
        createdAt
      }
    }
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      postInput: // value for 'postInput'
 *      imageInput: // value for 'imageInput'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const CreatePostLikeDocument = gql`
    mutation CreatePostLike($likeInput: PostLikeMutationInput!) {
  createPostLike(likeInput: $likeInput) {
    code
    message
    likes {
      id
      type
      createdAt
      updatedAt
    }
    currentLike {
      like
      type
    }
  }
}
    `;
export type CreatePostLikeMutationFn = Apollo.MutationFunction<CreatePostLikeMutation, CreatePostLikeMutationVariables>;

/**
 * __useCreatePostLikeMutation__
 *
 * To run a mutation, you first call `useCreatePostLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostLikeMutation, { data, loading, error }] = useCreatePostLikeMutation({
 *   variables: {
 *      likeInput: // value for 'likeInput'
 *   },
 * });
 */
export function useCreatePostLikeMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostLikeMutation, CreatePostLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostLikeMutation, CreatePostLikeMutationVariables>(CreatePostLikeDocument, options);
      }
export type CreatePostLikeMutationHookResult = ReturnType<typeof useCreatePostLikeMutation>;
export type CreatePostLikeMutationResult = Apollo.MutationResult<CreatePostLikeMutation>;
export type CreatePostLikeMutationOptions = Apollo.BaseMutationOptions<CreatePostLikeMutation, CreatePostLikeMutationVariables>;
export const UnlikeCommentPostDocument = gql`
    mutation UnlikeCommentPost($likeInput: PostLikeQueryInput!) {
  unLikePost(likeInput: $likeInput) {
    code
    message
  }
}
    `;
export type UnlikeCommentPostMutationFn = Apollo.MutationFunction<UnlikeCommentPostMutation, UnlikeCommentPostMutationVariables>;

/**
 * __useUnlikeCommentPostMutation__
 *
 * To run a mutation, you first call `useUnlikeCommentPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlikeCommentPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlikeCommentPostMutation, { data, loading, error }] = useUnlikeCommentPostMutation({
 *   variables: {
 *      likeInput: // value for 'likeInput'
 *   },
 * });
 */
export function useUnlikeCommentPostMutation(baseOptions?: Apollo.MutationHookOptions<UnlikeCommentPostMutation, UnlikeCommentPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnlikeCommentPostMutation, UnlikeCommentPostMutationVariables>(UnlikeCommentPostDocument, options);
      }
export type UnlikeCommentPostMutationHookResult = ReturnType<typeof useUnlikeCommentPostMutation>;
export type UnlikeCommentPostMutationResult = Apollo.MutationResult<UnlikeCommentPostMutation>;
export type UnlikeCommentPostMutationOptions = Apollo.BaseMutationOptions<UnlikeCommentPostMutation, UnlikeCommentPostMutationVariables>;
export const UpdateUserProfileDocument = gql`
    mutation UpdateUserProfile($data: UserProfileInput!) {
  updateProfile(data: $data) {
    code
    message
    profile {
      id
      gender
      phoneNumber
      liveAt
      province
      district
      ward
      createdAt
      story
    }
    user {
      id
      avatar
      firstName
      lastName
      email
      createdAt
    }
  }
}
    `;
export type UpdateUserProfileMutationFn = Apollo.MutationFunction<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;

/**
 * __useUpdateUserProfileMutation__
 *
 * To run a mutation, you first call `useUpdateUserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProfileMutation, { data, loading, error }] = useUpdateUserProfileMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(UpdateUserProfileDocument, options);
      }
export type UpdateUserProfileMutationHookResult = ReturnType<typeof useUpdateUserProfileMutation>;
export type UpdateUserProfileMutationResult = Apollo.MutationResult<UpdateUserProfileMutation>;
export type UpdateUserProfileMutationOptions = Apollo.BaseMutationOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const UploadAvatarDocument = gql`
    mutation UploadAvatar($url: String!, $userId: String!) {
  uploadAvatar(url: $url, userId: $userId)
}
    `;
export type UploadAvatarMutationFn = Apollo.MutationFunction<UploadAvatarMutation, UploadAvatarMutationVariables>;

/**
 * __useUploadAvatarMutation__
 *
 * To run a mutation, you first call `useUploadAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadAvatarMutation, { data, loading, error }] = useUploadAvatarMutation({
 *   variables: {
 *      url: // value for 'url'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUploadAvatarMutation(baseOptions?: Apollo.MutationHookOptions<UploadAvatarMutation, UploadAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadAvatarMutation, UploadAvatarMutationVariables>(UploadAvatarDocument, options);
      }
export type UploadAvatarMutationHookResult = ReturnType<typeof useUploadAvatarMutation>;
export type UploadAvatarMutationResult = Apollo.MutationResult<UploadAvatarMutation>;
export type UploadAvatarMutationOptions = Apollo.BaseMutationOptions<UploadAvatarMutation, UploadAvatarMutationVariables>;
export const FriendShipRecommendDocument = gql`
    query FriendShipRecommend($query: QueryInput, $userId: String!) {
  friendShipRecommend(query: $query, userId: $userId) {
    users {
      id
      avatar
      firstName
      lastName
      createdAt
    }
    page
    perPage
    totalCount
    totalPage
  }
}
    `;

/**
 * __useFriendShipRecommendQuery__
 *
 * To run a query within a React component, call `useFriendShipRecommendQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendShipRecommendQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendShipRecommendQuery({
 *   variables: {
 *      query: // value for 'query'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFriendShipRecommendQuery(baseOptions: Apollo.QueryHookOptions<FriendShipRecommendQuery, FriendShipRecommendQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FriendShipRecommendQuery, FriendShipRecommendQueryVariables>(FriendShipRecommendDocument, options);
      }
export function useFriendShipRecommendLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendShipRecommendQuery, FriendShipRecommendQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FriendShipRecommendQuery, FriendShipRecommendQueryVariables>(FriendShipRecommendDocument, options);
        }
export type FriendShipRecommendQueryHookResult = ReturnType<typeof useFriendShipRecommendQuery>;
export type FriendShipRecommendLazyQueryHookResult = ReturnType<typeof useFriendShipRecommendLazyQuery>;
export type FriendShipRecommendQueryResult = Apollo.QueryResult<FriendShipRecommendQuery, FriendShipRecommendQueryVariables>;
export const FriendRequestDocument = gql`
    query FriendRequest($query: QueryInput, $userId: String!) {
  getFriendRequest(query: $query, userId: $userId) {
    page
    perPage
    totalCount
    totalPage
    friendRequest {
      id
      accepted
      createdAt
      addressee {
        id
      }
      requester {
        avatar
        firstName
        lastName
        id
      }
    }
  }
}
    `;

/**
 * __useFriendRequestQuery__
 *
 * To run a query within a React component, call `useFriendRequestQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendRequestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendRequestQuery({
 *   variables: {
 *      query: // value for 'query'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFriendRequestQuery(baseOptions: Apollo.QueryHookOptions<FriendRequestQuery, FriendRequestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FriendRequestQuery, FriendRequestQueryVariables>(FriendRequestDocument, options);
      }
export function useFriendRequestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendRequestQuery, FriendRequestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FriendRequestQuery, FriendRequestQueryVariables>(FriendRequestDocument, options);
        }
export type FriendRequestQueryHookResult = ReturnType<typeof useFriendRequestQuery>;
export type FriendRequestLazyQueryHookResult = ReturnType<typeof useFriendRequestLazyQuery>;
export type FriendRequestQueryResult = Apollo.QueryResult<FriendRequestQuery, FriendRequestQueryVariables>;
export const FriendWaitingDocument = gql`
    query FriendWaiting($query: QueryInput, $userId: String!) {
  friendWaiting(query: $query, userId: $userId) {
    page
    perPage
    totalCount
    totalPage
    friendRequest {
      accepted
      addressee {
        avatar
        firstName
        lastName
        id
      }
      requester {
        avatar
        firstName
        lastName
        id
      }
    }
  }
}
    `;

/**
 * __useFriendWaitingQuery__
 *
 * To run a query within a React component, call `useFriendWaitingQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendWaitingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendWaitingQuery({
 *   variables: {
 *      query: // value for 'query'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFriendWaitingQuery(baseOptions: Apollo.QueryHookOptions<FriendWaitingQuery, FriendWaitingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FriendWaitingQuery, FriendWaitingQueryVariables>(FriendWaitingDocument, options);
      }
export function useFriendWaitingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendWaitingQuery, FriendWaitingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FriendWaitingQuery, FriendWaitingQueryVariables>(FriendWaitingDocument, options);
        }
export type FriendWaitingQueryHookResult = ReturnType<typeof useFriendWaitingQuery>;
export type FriendWaitingLazyQueryHookResult = ReturnType<typeof useFriendWaitingLazyQuery>;
export type FriendWaitingQueryResult = Apollo.QueryResult<FriendWaitingQuery, FriendWaitingQueryVariables>;
export const GetNotificationsDocument = gql`
    query GetNotifications($query: QueryInput, $ownerId: String!) {
  getNotification(query: $query, ownerId: $ownerId) {
    notifications {
      id
      content
      createdAt
      type
      read
      requester {
        avatar
        id
        firstName
        lastName
        createdAt
      }
    }
    totalUnread
    totalCount
    totalPage
    perPage
    page
  }
}
    `;

/**
 * __useGetNotificationsQuery__
 *
 * To run a query within a React component, call `useGetNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationsQuery({
 *   variables: {
 *      query: // value for 'query'
 *      ownerId: // value for 'ownerId'
 *   },
 * });
 */
export function useGetNotificationsQuery(baseOptions: Apollo.QueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
      }
export function useGetNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
        }
export type GetNotificationsQueryHookResult = ReturnType<typeof useGetNotificationsQuery>;
export type GetNotificationsLazyQueryHookResult = ReturnType<typeof useGetNotificationsLazyQuery>;
export type GetNotificationsQueryResult = Apollo.QueryResult<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const GetCommentByPostDocument = gql`
    query GetCommentByPost($query: QueryInput!, $postId: String!) {
  comments(query: $query, postId: $postId) {
    totalCount
    totalPage
    page
    perPage
    comment {
      id
      message
      createdAt
      updatedAt
      __typename
      author {
        id
        firstName
        lastName
        createdAt
        email
        avatar
        updatedAt
      }
      reply {
        id
        message
        createdAt
        updatedAt
        author {
          id
          firstName
          lastName
          createdAt
          email
          avatar
          updatedAt
        }
      }
      post {
        id
      }
    }
  }
}
    `;

/**
 * __useGetCommentByPostQuery__
 *
 * To run a query within a React component, call `useGetCommentByPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentByPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentByPostQuery({
 *   variables: {
 *      query: // value for 'query'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetCommentByPostQuery(baseOptions: Apollo.QueryHookOptions<GetCommentByPostQuery, GetCommentByPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentByPostQuery, GetCommentByPostQueryVariables>(GetCommentByPostDocument, options);
      }
export function useGetCommentByPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentByPostQuery, GetCommentByPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentByPostQuery, GetCommentByPostQueryVariables>(GetCommentByPostDocument, options);
        }
export type GetCommentByPostQueryHookResult = ReturnType<typeof useGetCommentByPostQuery>;
export type GetCommentByPostLazyQueryHookResult = ReturnType<typeof useGetCommentByPostLazyQuery>;
export type GetCommentByPostQueryResult = Apollo.QueryResult<GetCommentByPostQuery, GetCommentByPostQueryVariables>;
export const GetLikeByPostDocument = gql`
    query GetLikeByPost($likeInput: PostLikeQueryInput!) {
  getLikeByPost(likeInput: $likeInput) {
    code
    message
    likes {
      id
      type
      createdAt
      updatedAt
    }
    currentLike {
      like
      type
    }
    totalLike
  }
}
    `;

/**
 * __useGetLikeByPostQuery__
 *
 * To run a query within a React component, call `useGetLikeByPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLikeByPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLikeByPostQuery({
 *   variables: {
 *      likeInput: // value for 'likeInput'
 *   },
 * });
 */
export function useGetLikeByPostQuery(baseOptions: Apollo.QueryHookOptions<GetLikeByPostQuery, GetLikeByPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLikeByPostQuery, GetLikeByPostQueryVariables>(GetLikeByPostDocument, options);
      }
export function useGetLikeByPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLikeByPostQuery, GetLikeByPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLikeByPostQuery, GetLikeByPostQueryVariables>(GetLikeByPostDocument, options);
        }
export type GetLikeByPostQueryHookResult = ReturnType<typeof useGetLikeByPostQuery>;
export type GetLikeByPostLazyQueryHookResult = ReturnType<typeof useGetLikeByPostLazyQuery>;
export type GetLikeByPostQueryResult = Apollo.QueryResult<GetLikeByPostQuery, GetLikeByPostQueryVariables>;
export const GetAllPostDocument = gql`
    query GetAllPost($query: QueryInput!, $userId: String) {
  postsQuery(query: $query, userId: $userId) {
    posts {
      id
      content
      image {
        url
        id
        type
      }
      createdAt
      updatedAt
      user {
        id
        email
        lastName
        firstName
        avatar
        createdAt
      }
      comment {
        id
      }
    }
    page
    perPage
    totalCount
    totalPage
  }
}
    `;

/**
 * __useGetAllPostQuery__
 *
 * To run a query within a React component, call `useGetAllPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPostQuery({
 *   variables: {
 *      query: // value for 'query'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetAllPostQuery(baseOptions: Apollo.QueryHookOptions<GetAllPostQuery, GetAllPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPostQuery, GetAllPostQueryVariables>(GetAllPostDocument, options);
      }
export function useGetAllPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPostQuery, GetAllPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPostQuery, GetAllPostQueryVariables>(GetAllPostDocument, options);
        }
export type GetAllPostQueryHookResult = ReturnType<typeof useGetAllPostQuery>;
export type GetAllPostLazyQueryHookResult = ReturnType<typeof useGetAllPostLazyQuery>;
export type GetAllPostQueryResult = Apollo.QueryResult<GetAllPostQuery, GetAllPostQueryVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser($userId: String!) {
  getCurrentUser(userId: $userId) {
    id
    avatar
    firstName
    lastName
    createdAt
    profile {
      id
      dayOfBirth
      district
      gender
      liveAt
      phoneNumber
      province
      story
      updatedAt
      ward
    }
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetUserNotCurrentDocument = gql`
    query GetUserNotCurrent($userId: String!) {
  getUserNotCurrent(userId: $userId) {
    code
    message
    users {
      id
      firstName
      lastName
      createdAt
      avatar
    }
  }
}
    `;

/**
 * __useGetUserNotCurrentQuery__
 *
 * To run a query within a React component, call `useGetUserNotCurrentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserNotCurrentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserNotCurrentQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserNotCurrentQuery(baseOptions: Apollo.QueryHookOptions<GetUserNotCurrentQuery, GetUserNotCurrentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserNotCurrentQuery, GetUserNotCurrentQueryVariables>(GetUserNotCurrentDocument, options);
      }
export function useGetUserNotCurrentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserNotCurrentQuery, GetUserNotCurrentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserNotCurrentQuery, GetUserNotCurrentQueryVariables>(GetUserNotCurrentDocument, options);
        }
export type GetUserNotCurrentQueryHookResult = ReturnType<typeof useGetUserNotCurrentQuery>;
export type GetUserNotCurrentLazyQueryHookResult = ReturnType<typeof useGetUserNotCurrentLazyQuery>;
export type GetUserNotCurrentQueryResult = Apollo.QueryResult<GetUserNotCurrentQuery, GetUserNotCurrentQueryVariables>;
export const HoverCardDocument = gql`
    query HoverCard($userId: String!) {
  hoverCard(userId: $userId) {
    isFriend
    user {
      id
      avatar
      firstName
      lastName
      createdAt
      profile {
        dayOfBirth
        gender
        liveAt
        phoneNumber
        province
        district
        ward
      }
    }
  }
}
    `;

/**
 * __useHoverCardQuery__
 *
 * To run a query within a React component, call `useHoverCardQuery` and pass it any options that fit your needs.
 * When your component renders, `useHoverCardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHoverCardQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useHoverCardQuery(baseOptions: Apollo.QueryHookOptions<HoverCardQuery, HoverCardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HoverCardQuery, HoverCardQueryVariables>(HoverCardDocument, options);
      }
export function useHoverCardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HoverCardQuery, HoverCardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HoverCardQuery, HoverCardQueryVariables>(HoverCardDocument, options);
        }
export type HoverCardQueryHookResult = ReturnType<typeof useHoverCardQuery>;
export type HoverCardLazyQueryHookResult = ReturnType<typeof useHoverCardLazyQuery>;
export type HoverCardQueryResult = Apollo.QueryResult<HoverCardQuery, HoverCardQueryVariables>;
export const ListJoinCommentPostDocument = gql`
    subscription ListJoinCommentPost($room: String!) {
  listJoinCommentPost(room: $room) {
    data {
      id
      message
      createdAt
      author {
        avatar
        firstName
        lastName
        createdAt
      }
    }
    commentId
    type
  }
}
    `;

/**
 * __useListJoinCommentPostSubscription__
 *
 * To run a query within a React component, call `useListJoinCommentPostSubscription` and pass it any options that fit your needs.
 * When your component renders, `useListJoinCommentPostSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListJoinCommentPostSubscription({
 *   variables: {
 *      room: // value for 'room'
 *   },
 * });
 */
export function useListJoinCommentPostSubscription(baseOptions: Apollo.SubscriptionHookOptions<ListJoinCommentPostSubscription, ListJoinCommentPostSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ListJoinCommentPostSubscription, ListJoinCommentPostSubscriptionVariables>(ListJoinCommentPostDocument, options);
      }
export type ListJoinCommentPostSubscriptionHookResult = ReturnType<typeof useListJoinCommentPostSubscription>;
export type ListJoinCommentPostSubscriptionResult = Apollo.SubscriptionResult<ListJoinCommentPostSubscription>;
export const LittenJoinRoomDocument = gql`
    subscription LittenJoinRoom($room: String!) {
  littenJoinRoomRequest(room: $room) {
    id
    content
    createdAt
    type
    requester {
      avatar
      id
      firstName
      lastName
      createdAt
    }
  }
}
    `;

/**
 * __useLittenJoinRoomSubscription__
 *
 * To run a query within a React component, call `useLittenJoinRoomSubscription` and pass it any options that fit your needs.
 * When your component renders, `useLittenJoinRoomSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLittenJoinRoomSubscription({
 *   variables: {
 *      room: // value for 'room'
 *   },
 * });
 */
export function useLittenJoinRoomSubscription(baseOptions: Apollo.SubscriptionHookOptions<LittenJoinRoomSubscription, LittenJoinRoomSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<LittenJoinRoomSubscription, LittenJoinRoomSubscriptionVariables>(LittenJoinRoomDocument, options);
      }
export type LittenJoinRoomSubscriptionHookResult = ReturnType<typeof useLittenJoinRoomSubscription>;
export type LittenJoinRoomSubscriptionResult = Apollo.SubscriptionResult<LittenJoinRoomSubscription>;
export const TestListenDocument = gql`
    subscription TestListen($room: String!) {
  listenTest(room: $room) {
    date
  }
}
    `;

/**
 * __useTestListenSubscription__
 *
 * To run a query within a React component, call `useTestListenSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTestListenSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestListenSubscription({
 *   variables: {
 *      room: // value for 'room'
 *   },
 * });
 */
export function useTestListenSubscription(baseOptions: Apollo.SubscriptionHookOptions<TestListenSubscription, TestListenSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TestListenSubscription, TestListenSubscriptionVariables>(TestListenDocument, options);
      }
export type TestListenSubscriptionHookResult = ReturnType<typeof useTestListenSubscription>;
export type TestListenSubscriptionResult = Apollo.SubscriptionResult<TestListenSubscription>;