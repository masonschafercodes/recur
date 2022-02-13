import gql from 'graphql-tag'

export const FETCH_USER_SUBSCRIPTIONS_QUERY = gql`
  query getUserSubscriptions($username: String!) {
    getUserSubscriptions(username: $username) {
      id
      subscriptionName
      price
      createdAt
      isSuspended
    }
  }
`;
