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
  DateTime: any;
  JSONObject: any;
};

export type AllPostResponse = BaseResponse & {
  __typename?: 'AllPostResponse';
  code: Scalars['Float'];
  message: Scalars['String'];
  posts?: Maybe<Post>;
};

export type BaseResponse = {
  code: Scalars['Float'];
  message: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  message: Scalars['String'];
  parent: User;
  post: Array<Post>;
  updatedAt: Scalars['String'];
  user: User;
};

export type CommentResponse = {
  __typename?: 'CommentResponse';
  date: Scalars['DateTime'];
  message: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  createdAt: Scalars['String'];
  fileName: Scalars['String'];
  id: Scalars['ID'];
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
  id: Scalars['ID'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: PostResponse;
  login: UserResponse;
  mutationComment: CommentResponse;
  pubSubMutation: Scalars['Boolean'];
  pubSubMutationToDynamicTopic: Scalars['Boolean'];
  register: UserResponse;
};


export type MutationCreatePostArgs = {
  imageInput: Array<ImageInput>;
  postInput: PostInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationMutationCommentArgs = {
  message?: InputMaybe<Scalars['String']>;
};


export type MutationPubSubMutationArgs = {
  message?: InputMaybe<Scalars['String']>;
};


export type MutationPubSubMutationToDynamicTopicArgs = {
  message?: InputMaybe<Scalars['String']>;
  topic: Scalars['String'];
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};

export type Notification = {
  __typename?: 'Notification';
  date: Scalars['DateTime'];
  id: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
};

export type NotificationResponse = BaseResponse & {
  __typename?: 'NotificationResponse';
  code: Scalars['Float'];
  message: Scalars['String'];
  notification: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  caption: Scalars['String'];
  checking: Scalars['String'];
  comment: Array<Comment>;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  image: Array<Image>;
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
  user?: InputMaybe<Scalars['JSONObject']>;
  visible?: InputMaybe<Scalars['String']>;
};

export type PostResponse = BaseResponse & {
  __typename?: 'PostResponse';
  code: Scalars['Float'];
  message: Scalars['String'];
  post?: Maybe<Post>;
};

export type Query = {
  __typename?: 'Query';
  currentDate: Scalars['DateTime'];
  posts: Array<Post>;
  users: Scalars['String'];
};

export type RegisterInput = {
  confirmPassword?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  listenComment: CommentResponse;
  normalSubscription: Notification;
  subscriptionWithFilter: Notification;
  subscriptionWithFilterToDynamicTopic: Notification;
};


export type SubscriptionSubscriptionWithFilterToDynamicTopicArgs = {
  topic: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  githubId?: Maybe<Scalars['String']>;
  googleId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName: Scalars['String'];
  posts: Array<Post>;
  profile: UserProfile;
  provider?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
};

export type UserProfile = {
  __typename?: 'UserProfile';
  address: Scalars['String'];
  createdAt: Scalars['String'];
  dayOfBirth: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['ID'];
  phoneNumber: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
};

export type UserResponse = BaseResponse & {
  __typename?: 'UserResponse';
  accessToken?: Maybe<Scalars['String']>;
  code: Scalars['Float'];
  message: Scalars['String'];
  user?: Maybe<User>;
};

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', code: number, message: string, accessToken?: string | null, user?: { __typename?: 'User', id: string, email: string, lastName: string, firstName: string, createdAt: string, updatedAt: string, avatar?: string | null } | null } };

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', code: number, message: string } };

export type CreatePostMutationVariables = Exact<{
  postInput: PostInput;
  imageInput: Array<ImageInput> | ImageInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostResponse', code: number, message: string, post?: { __typename?: 'Post', id: string, content: string, updatedAt: string, createdAt: string, image: Array<{ __typename?: 'Image', url: string, type: string, fileName: string }>, user: { __typename?: 'User', id: string, firstName: string, lastName: string, avatar?: string | null, createdAt: string } } | null } };

export type GetAllPostQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPostQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: string, content: string, updatedAt: string, createdAt: string, image: Array<{ __typename?: 'Image', url: string }>, user: { __typename?: 'User', id: string, firstName: string, lastName: string, avatar?: string | null } }> };

export type ListentCommentSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ListentCommentSubscription = { __typename?: 'Subscription', listenComment: { __typename?: 'CommentResponse', date: any, message: string } };

export type MutationCommentMutationVariables = Exact<{
  message?: InputMaybe<Scalars['String']>;
}>;


export type MutationCommentMutation = { __typename?: 'Mutation', mutationComment: { __typename?: 'CommentResponse', date: any, message: string } };


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
        fileName
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
export const GetAllPostDocument = gql`
    query getAllPost {
  posts {
    id
    content
    updatedAt
    createdAt
    image {
      url
    }
    user {
      id
      firstName
      lastName
      avatar
    }
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
 *   },
 * });
 */
export function useGetAllPostQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPostQuery, GetAllPostQueryVariables>) {
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
export const ListentCommentDocument = gql`
    subscription ListentComment {
  listenComment {
    date
    message
  }
}
    `;

/**
 * __useListentCommentSubscription__
 *
 * To run a query within a React component, call `useListentCommentSubscription` and pass it any options that fit your needs.
 * When your component renders, `useListentCommentSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListentCommentSubscription({
 *   variables: {
 *   },
 * });
 */
export function useListentCommentSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ListentCommentSubscription, ListentCommentSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ListentCommentSubscription, ListentCommentSubscriptionVariables>(ListentCommentDocument, options);
      }
export type ListentCommentSubscriptionHookResult = ReturnType<typeof useListentCommentSubscription>;
export type ListentCommentSubscriptionResult = Apollo.SubscriptionResult<ListentCommentSubscription>;
export const MutationCommentDocument = gql`
    mutation MutationComment($message: String) {
  mutationComment(message: $message) {
    date
    message
  }
}
    `;
export type MutationCommentMutationFn = Apollo.MutationFunction<MutationCommentMutation, MutationCommentMutationVariables>;

/**
 * __useMutationCommentMutation__
 *
 * To run a mutation, you first call `useMutationCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutationCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutationCommentMutation, { data, loading, error }] = useMutationCommentMutation({
 *   variables: {
 *      message: // value for 'message'
 *   },
 * });
 */
export function useMutationCommentMutation(baseOptions?: Apollo.MutationHookOptions<MutationCommentMutation, MutationCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutationCommentMutation, MutationCommentMutationVariables>(MutationCommentDocument, options);
      }
export type MutationCommentMutationHookResult = ReturnType<typeof useMutationCommentMutation>;
export type MutationCommentMutationResult = Apollo.MutationResult<MutationCommentMutation>;
export type MutationCommentMutationOptions = Apollo.BaseMutationOptions<MutationCommentMutation, MutationCommentMutationVariables>;