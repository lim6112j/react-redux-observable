export const fetchUser = username => {
  console.log('username => ', username);
  return { type: 'FETCH_USER', payload: username }
};
export const fetchUserFulfilled = payload => ({ type: 'FETCH_USER_FULFILLED', payload });