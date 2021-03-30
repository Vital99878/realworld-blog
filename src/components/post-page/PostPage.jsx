/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom'
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { format } from 'date-fns';
import classnames from 'classnames/bind';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Popconfirm } from 'antd';
import styles from '../post/Post.module.scss';
import userAvatar from '../post/img/Rectangle-1.png';
import { getPostThunk, deletePostThunk, likePostThunk, dislikePostThunk } from '../../redux/actions';
import Spinner from '../spinner';

const cn = classnames.bind(styles);
const CLASS_NAME = 'post';

const PostPage = ({ openedPost, isSignUp, getPost, username, deletePost, likePost, dislikePost, token }) => {

  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    getPost(slug).then(() => setIsLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ]);

  if (isLoading) {
    return <Spinner />
  }

  if (!openedPost) {
    return <Redirect to="/" />
  }

  let toogleLike;

  openedPost.favorited ? toogleLike = dislikePost : toogleLike = likePost;

  const { title, favoritesCount, tagList, author, createdAt, description, body } = openedPost;
  const tagsList = tagList.map(tag => <li key={uuidv4()} className={cn(`${CLASS_NAME}__tag`)}>{tag}</li>);

  return (
    <div className={cn(CLASS_NAME)}>
      <header className={cn(`${CLASS_NAME}__header`)}>
        <div className={cn(`${CLASS_NAME}__info`)}>
          <div className={cn(`${CLASS_NAME}__title-wrapper`)}>
            <h2 className={cn(`${CLASS_NAME}__title`)}>{title}</h2>
            <button 
              className={cn(`${CLASS_NAME}__button-like`, openedPost.favorited && `${CLASS_NAME}__button-like--liked`)} 
              disabled={!isSignUp}
              type="button"
              label="Like"
              onClick={() => toogleLike(slug, token)}
            />
            <span className={cn(`${CLASS_NAME}__likes`)}>{favoritesCount}</span>
          </div>
          <ul className={cn(`${CLASS_NAME}__tags`)}>
            {tagsList.length ? tagsList : 'no tags'}
          </ul>
        </div>
        <div className={cn(`${CLASS_NAME}__author`)}>
          <div className={cn(`${CLASS_NAME}__author-info`)}>
            <span className={cn(`${CLASS_NAME}__author-name`)}>{author.username}</span>
            <span className={cn(`${CLASS_NAME}__date`)}>{format(new Date(createdAt), 'MMMM dd, yyyy ')}</span>
          </div>
          <img src={author.image || userAvatar} className={cn(`${CLASS_NAME}__autor-avatar`)} alt="user-avatar" />
        </div>
      </header>
      <div className={cn(`${CLASS_NAME}__description`)}>
        <p className={cn(`${CLASS_NAME}__description-text`)}>{description}</p>
        {username === openedPost.author.username &&  <div>
          <Popconfirm
            placement="rightTop"
            title="Are you sure to delete this article?"
            onConfirm={() => deletePost(slug, token)}
            okText="Yes"
            cancelText="No"
          >
            <button type="button" className={cn(`${CLASS_NAME}__button-delete`)}>Delete</button>
          </Popconfirm>
          <Link 
            to={{pathname: `/articles/${slug}/edit`, state: {updatePost: openedPost}}} 
            className={cn(`${CLASS_NAME}__button-edit`)}
          >
            Edit
          </Link>
        </div>}
      </div>
      <ReactMarkdown plugins={[gfm]}>{body}</ReactMarkdown>
    </div>
  )
};

const mapStateToProps = ({ posts, user }) => ({
  ...posts,
  ...user,
});

const mapDispatchToProps = {
  getPost: getPostThunk,
  deletePost: deletePostThunk,
  likePost: likePostThunk,
  dislikePost: dislikePostThunk,
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);

PostPage.defaultProps = {
  openedPost: {},
  username: '',
  token: '',
}

PostPage.propTypes = {
  openedPost: PropTypes.objectOf(PropTypes.any),
  isSignUp: PropTypes.bool.isRequired,
  username: PropTypes.string,
  token: PropTypes.string,
  getPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  dislikePost: PropTypes.func.isRequired,
}