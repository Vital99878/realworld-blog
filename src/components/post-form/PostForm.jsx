import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classnames from 'classnames/bind';
import styles from './PostForm.module.scss';
import Error from '../modals-pages/components';
import RealworldBlogApi from '../../api/realworldBlogApi';

const { createPost, updatePost } = new RealworldBlogApi();

const cn = classnames.bind(styles);

const CLASS_NAME = 'post-form';

const PostForm = ({ token, location, isSignUp }) => {

  
 
  const isEditing = Boolean(location.state?.updatePost);

  const { body, description, slug, tagList, title } = location.state?.updatePost || 
    {author: null, body: null, description: null, slug: null, tagList: null, title: null};

  const [tags, setTags] =  useState(tagList || ['']);
  let [isPosted, setIsPosted] = useState(false);

  const { register, handleSubmit, errors } = useForm();
  const onSubmitPost = formData => createPost({...formData, tagList: tags}, token).then(() => setIsPosted(true));
  const onSubmitEdit = formData => updatePost({...formData, tagList: tags}, slug, token).then(() => setIsPosted(true));

  let onSubmit;
  
  if (isEditing) {
    onSubmit = onSubmitEdit;
  } else {
    onSubmit = onSubmitPost;
  }

  if (!isSignUp) {
    return <Redirect to="/sign-in" />
  }

  if (isPosted) {
    return <Redirect to="/" />
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
  }

  const tagsList = tags.map((tag, index) => 
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
        className={cn(`${CLASS_NAME}__button-delete-tag`, `${tags.length === 1 && cn(`${CLASS_NAME}__button-delete-tag--disabled`)}`)} 
        onClick={() => handleDeleteTag(index)}
      >
        Delete
      </button>
    </div>
  );

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
          ref={register({required: true})} 
        />
        {errors.title?.type === "required" && <Error text="Title is required" />}
      </label>
      <label className={cn(`${CLASS_NAME}__label`)}>
        <span className={cn(`${CLASS_NAME}__text`)}>Short description</span>
        <input 
          className={cn(`${CLASS_NAME}__input`)}
          type="text" 
          name="description"
          placeholder="Title"
          defaultValue={description}
          ref={register({required: true})} 
        />
        {errors.description?.type === "required" && <Error text="Description is required" />}
      </label>
      <label className={cn(`${CLASS_NAME}__label`)}>
        <span className={cn(`${CLASS_NAME}__text`)}>Text</span>
        <textarea 
          name="body" 
          cols="30" 
          rows="7" 
          className={cn(`${CLASS_NAME}__input`)}
          placeholder="Text"
          ref={register({required: true})}
          defaultValue={body}
        >
        </textarea>
        {errors.body?.type === "required" && <Error text="Text is required" />}
      </label>
      <label className={cn(`${CLASS_NAME}__label`)}>
        <span className={cn(`${CLASS_NAME}__text`)}>Tags</span>
        <div className={cn(`${CLASS_NAME}__tags`)}>
          <div className={cn(`${CLASS_NAME}__tags-wrapper`)}>
            {tagsList}
          </div>
          <button 
            type="button"
            className={cn(`${CLASS_NAME}__button-add-tag`)}
            onClick={handleAddTag}
          >
            Add tag
          </button>
        </div>
      </label>
      <button className={cn(`${CLASS_NAME}__button-send`)}>Send</button>
    </form>
  );
};

const mapStateToProps = ({ user }) => ({
  ...user,
})

export default connect(mapStateToProps)(PostForm);
