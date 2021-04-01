import React, { useEffect } from 'react';
import classnames from 'classnames/bind';
import { Pagination } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './PostsList.module.scss';
import Post from '../post';
import { getPostsThunk, setCurrentPageAction } from '../../redux/actions/postsActions';
import Spinner from '../spinner';

const getSkipForPagination = (currentPage) => (currentPage - 1) * 5;

const cn = classnames.bind(styles);

const PostsList = ({ posts, isLoading, getPosts, postsCount, currentPage, setCurrentPage, token }) => {
  useEffect(() => {
    getPosts(getSkipForPagination(currentPage), token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const postsList = posts.map((post) => <Post post={post} key={post.slug} />);

  return (
    <>
      {isLoading && <Spinner />}
      <ul className={cn('posts')}>{postsList}</ul>
      <div className={cn('pagination-wrapper')}>
        <Pagination
          pageSize={5}
          showSizeChanger={false}
          size="small"
          total={postsCount}
          defaultPageSize={5}
          current={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    </>
  );
};

const mapStateToProps = ({ posts, user }) => ({
  ...posts,
  ...user,
});

const mapDispatchToProps = {
  getPosts: getPostsThunk,
  setCurrentPage: setCurrentPageAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);

PostsList.defaultProps = {
  token: '',
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  getPosts: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  postsCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  token: PropTypes.string,
};
