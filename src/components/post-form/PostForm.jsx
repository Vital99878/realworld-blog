/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import classnames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './PostForm.module.scss';
import Error from '../modals-pages/components';
import RealworldBlogApi from '../../api/realworldBlogApi';
import { getPostThunk, setPostAction } from '../../redux/actions';

const { createPost, updatePost } = RealworldBlogApi;

const cn = classnames.bind(styles);

const CLASS_NAME = 'post-form';

const PostForm = ({ token, location, isSignUp, openedPost, getPost, setPost }) => {
  const isEditing = location.pathname !== '/new-article';
  const { slug } = useParams();

  useEffect(() => {
    if (isEditing) {
      getPost(slug, token);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ])

  const { body, description, tagList, title } = openedPost || {
    body: null,
    description: null,
    tagList: null,
    title: null,
  };

  const [tags, setTags] = useState(tagList || ['']);
  const [isPosted, setIsPosted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm();
  const onSubmitPost = (formData) => {
    setIsLoading(true);
    createPost({ ...formData, tagList: tags }, token)
      .then(() => setIsLoading(false))
      .then(() => setIsPosted(true))
  };

  const onSubmitEdit = (formData) => {
    setIsLoading(true);
    updatePost({ ...formData, tagList: tags }, slug, token)
      .then(() => setIsLoading(false))
      .then(() => setIsPosted(true))
      .then(() => setPost(null));
  };

  let onSubmit;

  if (isEditing) {
    onSubmit = onSubmitEdit;
  } else {
    onSubmit = onSubmitPost;
  }

  if (!isSignUp) {
    return <Redirect to="/sign-in" />;
  }

  if (isPosted) {
    return <Redirect to="/" />;
  }

  const handleAddTag = () => {
    const newTags = [...tags, ''];
    setTags(newTags);
  };

  const handleDeleteTag = (index) => {
    const newTags = tags.filter((tag, i) => index !== i);
    setTags(newTags);
  };

  const handleText = (event, index) => {
    const newTags = [...tags];
    newTags[index] = event.target.value;
    setTags(newTags);
  };

  const tagsList = tags.map((tag, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <div key={index} className={cn(`${CLASS_NAME}__tag-wrapper`)}>
      <input
        className={cn(`${CLASS_NAME}__tag`)}
        type="text"
        name={index}
        placeholder="Tag"
        index={index}
        value={tags[index]}
        onChange={(event) => handleText(event, index)}
      />
      <button
        disabled={tags.length === 1}
        type="button"
        className={cn(
          `${CLASS_NAME}__button-delete-tag`,
          `${tags.length === 1 && cn(`${CLASS_NAME}__button-delete-tag--disabled`)}`
        )}
        onClick={() => handleDeleteTag(index)}
      >
        Delete
      </button>
    </div>
  ));

  return (
    <form className={cn(CLASS_NAME)} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={cn(`${CLASS_NAME}__title`)}>{isEditing ? 'Edit article' : 'Create new article'}</h2>
      <label className={cn(`${CLASS_NAME}__label`)}>
        <span className={cn(`${CLASS_NAME}__text`)}>Title</span>
        <input
          className={cn(`${CLASS_NAME}__input`)}
          type="text"
          name="title"
          placeholder="Title"
          defaultValue={title}
          ref={register({ required: true })}
        />
        {errors.title?.type === 'required' && <Error text="Title is required" />}
      </label>
      <label className={cn(`${CLASS_NAME}__label`)}>
        <span className={cn(`${CLASS_NAME}__text`)}>Short description</span>
        <input
          className={cn(`${CLASS_NAME}__input`)}
          type="text"
          name="description"
          placeholder="Title"
          defaultValue={description}
          ref={register({ required: true })}
        />
        {errors.description?.type === 'required' && <Error text="Description is required" />}
      </label>
      <label className={cn(`${CLASS_NAME}__label`)}>
        <span className={cn(`${CLASS_NAME}__text`)}>Text</span>
        <textarea
          name="body"
          cols="30"
          rows="7"
          className={cn(`${CLASS_NAME}__input`)}
          placeholder="Text"
          ref={register({ required: true })}
          defaultValue={body}
        />
        {errors.body?.type === 'required' && <Error text="Text is required" />}
      </label>
      <label className={cn(`${CLASS_NAME}__label`)}>
        <span className={cn(`${CLASS_NAME}__text`)}>Tags</span>
        <div className={cn(`${CLASS_NAME}__tags`)}>
          <div className={cn(`${CLASS_NAME}__tags-wrapper`)}>{tagsList}</div>
          <button type="button" className={cn(`${CLASS_NAME}__button-add-tag`)} onClick={handleAddTag}>
            Add tag
          </button>
        </div>
      </label>
      <button type="submit" className={cn(`${CLASS_NAME}__button-send`)}>
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};

const mapStateToProps = ({ user, posts }) => ({
  ...user,
  ...posts,
});

const mapDispatchToProps = {
  getPost: getPostThunk,
  setPost: setPostAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);

PostForm.defaultProps = {
  token: '',
};

PostForm.defaultProps = {
  openedPost: {},
}

PostForm.propTypes = {
  token: PropTypes.string,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  isSignUp: PropTypes.bool.isRequired,
  openedPost: PropTypes.objectOf(PropTypes.any),
  getPost: PropTypes.func.isRequired,
  setPost: PropTypes.func.isRequired,
};
