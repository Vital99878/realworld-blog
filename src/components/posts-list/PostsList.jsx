import React, { useEffect } from 'react';
import Post from '../post';
import classnames from 'classnames/bind';
import styles from './PostsList.module.scss';
import { Pagination } from 'antd';
import { connect } from 'react-redux';
import { getPostsThunk, setCurrentPageAction } from '../../redux/actions';
import Spinner from '../spinner';

const getSkipForPagination = currentPage => (currentPage - 1) * 5;

const cn = classnames.bind(styles);

const PostsList = ({ posts, isLoading, getPosts, postsCount, currentPage, setCurrentPage }) => {

  useEffect(() => {
    getPosts(getSkipForPagination(currentPage));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ currentPage ])

  const postsList = posts.map(post => {
    return <Post post={post} key={post.slug} />
  }) 

  return (
    <>
      {isLoading && <Spinner />}
      <ul className={cn('posts')}>{postsList}</ul>
      <div className={cn("pagination-wrapper")}>
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
  )
}

const mapStateToProps = ({ posts }) => ({
  ...posts,
});

const mapDispatchToProps = {
  getPosts: getPostsThunk,
  setCurrentPage: setCurrentPageAction,
};


export default connect(mapStateToProps, mapDispatchToProps)(PostsList);

