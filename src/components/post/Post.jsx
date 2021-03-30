/* eslint-disable no-unused-expressions */
import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import userAvatar from './img/Rectangle-1.png';
import styles from './Post.module.scss';
import { likePostThunk, dislikePostThunk } from '../../redux/actions';


const cn = classnames.bind(styles);

const CLASS_NAME = 'post';

const Post = ({ post, isSignUp, likePost, dislikePost, token }) => {
  const { title, description, favoritesCount, author, tagList, createdAt, slug, favorited } = post;

  const tagsList = tagList.map(tag => <li key={uuidv4()} className={cn(`${CLASS_NAME}__tag`)}>{tag}</li>);

  let toogleLike;

  favorited ? toogleLike = dislikePost : toogleLike = likePost;

  return  (
    <li className={cn(CLASS_NAME)}>
      <header className={cn(`${CLASS_NAME}__header`)}>
        <div className={cn(`${CLASS_NAME}__info`)}>
          <div className={cn(`${CLASS_NAME}__title-wrapper`)}>
            <Link className={cn(`${CLASS_NAME}__title`)} to={`/articles/${slug}`}>{title}</Link>
            <button 
              className={cn(`${CLASS_NAME}__button-like`, favorited && `${CLASS_NAME}__button-like--liked`)} 
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
      <p className={cn(`${CLASS_NAME}__description`)}>{description}</p>
    </li>
  )
};

const mapStateToProps = ({ user, posts }) => ({
  ...user,
  ...posts, 
});

const mapDispatchToProps = {
  likePost: likePostThunk,
  dislikePost: dislikePostThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);

Post.defaultProps = {
  token: '',
}

Post.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  isSignUp: PropTypes.bool.isRequired,
  token: PropTypes.string,
  likePost: PropTypes.func.isRequired,
  dislikePost: PropTypes.func.isRequired,
}