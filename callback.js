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

const submitPost = (newPost, callback) => {
  setTimeout(() => {
    if (!posts.map(post => post.id).includes(newPost.id)) {
      posts.push(newPost);
      callback();
    }
  }, 2000);
};

getPosts();
submitPost(newPost, getPosts);
