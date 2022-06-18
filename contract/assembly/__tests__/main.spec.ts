import {
  fetchMessages,
  getPost,
  listPosts,
  totalPosts,
} from '../index';

describe('Posts::initial', () => {
  it('should be empty', () => {
    expect(getPost('uuid')).toBeNull();
    expect(totalPosts()).toBe(0);
    expect(listPosts()).toHaveLength(0);
  });
});

describe('Messages::initial', () => {
  it('should be empty', () => {
    expect(fetchMessages("uuid")).toHaveLength(0);
  });
})
