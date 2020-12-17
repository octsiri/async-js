const POSTS_API = 'https://jsonplaceholder.typicode.com/posts';
const posts = [
  {id: '1', title: 'Post One', body: 'Lorem Ipsum Post One'},
  {id: '2', title: 'Post Two', body: 'Lorem Ipsum Post Two'},
];
const newPost = {id: '3', title: 'Post Three', body: 'Lorem Ipsum Post Three'};

const getPosts = () => {
  setTimeout(() => {
    let output = '';
    posts.map(post => {
      output += `<li>${post.title}</li>`;
    });
    document.body.innerHTML = output;
  }, 1000);
};

const submitPost = newPost => {
  return new Promise((resolve, reject) => {
    console.log('Called');
    const error = false;
    setTimeout(() => {
      if (!posts.map(post => post.id).includes(newPost.id)) {
        posts.push(newPost);
      }
      if (error) {
        reject('Error: Something went wrong!');
      } else {
        resolve();
      }
    }, 1000);
  });
};

const deletePost = postID => {
  return new Promise((resolve, reject) => {
    const removeIdx = posts.map(post => post.id).indexOf(postID);
    setTimeout(() => {
      if (removeIdx > -1) {
        posts.splice(removeIdx, 1);
        resolve();
      } else {
        reject('Error: Post ID is not found');
      }
    }, 1000);
  });
};

const sanitizeFetchData = currentPosts => {
  return currentPosts.map(post => ({
    id: post.id.toString(),
    title: post.title,
    body: post.body,
  }));
};

fetchPosts = async (api, rows) => {
  const rawData = await fetch(api);
  const newPosts = await rawData.json();
  const result = newPosts.splice(0, rows);
  const cleanPosts = sanitizeFetchData(result);
  console.log({result, cleanPosts});
  cleanPosts.map(post => {
    const ijectIdxPost = posts.map(item => item.id).indexOf(post.id);
    if (ijectIdxPost > -1) {
      posts[ijectIdxPost] = post;
    } else {
      posts.push(post);
    }
  });
};

const runAsyncPromises = async () => {
  try {
    getPosts(posts);
    await submitPost(newPost);
    getPosts();
    await deletePost('1');
    getPosts();
    fetchPosts(POSTS_API, 10);
    getPosts();
  } catch (err) {
    document.body.innerHTML = `<h2>${err}</h2>`;
  }
};

runAsyncPromises();
