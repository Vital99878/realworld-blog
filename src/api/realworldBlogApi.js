/* eslint-disable no-unused-expressions */
class RealworldBlogApi {
  constructor() {
    this.API_BASE = 'https://conduit.productionready.io/api/';

    this.getPosts = async (take, token) => {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json; charset=utf-8');
      token ? myHeaders.append('Authorization', `Token ${token}`) : '';

      const response = await fetch(`${this.API_BASE}articles?limit=5&offset=${take}`, {
        method: 'GET',
        headers: myHeaders,
      });

      const body = await response.json();

      return body;
    };

    this.getPost = async (slug, token) => {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json; charset=utf-8');
      token ? myHeaders.append('Authorization', `Token ${token}`) : '';

      const response = await fetch(`${this.API_BASE}articles/${slug}`, {
        method: 'GET',
        headers: myHeaders,
      });
      const body = await response.json();

      return body;
    };

    this.signUp = async (userData) => {
      const user = { user: userData };
      const response = await fetch(`${this.API_BASE}users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(user),
      });

      const body = await response.json();

      return body;
    };

    this.signIn = async (userData) => {
      const user = { user: userData };
      const response = await fetch(`${this.API_BASE}users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(user),
      });

      const body = await response.json();

      return body;
    };

    this.editUser = async (userData, token) => {
      const user = { user: userData };
      const response = await fetch(`${this.API_BASE}user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(user),
      });

      const body = await response.json();

      return body;
    };

    this.createPost = async (userData, token) => {
      const post = { article: userData };
      const response = await fetch(`${this.API_BASE}articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(post),
      });

      const body = await response.json();

      return body;
    };

    this.updatePost = async (userData, slug, token) => {
      const post = { article: userData };
      const response = await fetch(`${this.API_BASE}articles/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(post),
      });

      const body = await response.json();

      return body;
    };

    this.deletePost = async (slug, token) => {
      await fetch(`${this.API_BASE}articles/${slug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Token ${token}`,
        },
      });
    };

    this.likePost = async (slug, token) => {
      const response = await fetch(`${this.API_BASE}articles/${slug}/favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Token ${token}`,
        },
      });

      const body = response.json();

      return body;
    };

    this.dislikePost = async (slug, token) => {
      const response = await fetch(`${this.API_BASE}articles/${slug}/favorite`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Token ${token}`,
        },
      });

      const body = response.json();

      return body;
    };
  }
};

export default new RealworldBlogApi();
