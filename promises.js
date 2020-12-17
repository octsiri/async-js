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
    }, 2000);
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
    }, 4000);
  });
};

const runPromisesAll = () => {
  Promise.all([getPosts(), submitPost(newPost), deletePost('1')])
    .then(() => getPosts())
    .catch(err => {
      document.body.innerHTML = `<h2>${err}</h2>`;
    });
};

const runPromisesRace = () => {
  Promise.race([getPosts(), submitPost(newPost), deletePost('1')])
    .then(() => getPosts())
    .catch(err => {
      document.body.innerHTML = `<h2>${err}</h2>`;
    });
};

const runEachPromises = () => {
  getPosts();
  submitPost(newPost)
    .then(() => getPosts())
    .catch(err => {
      document.body.innerHTML = `<h2>${err}</h2>`;
    });
  deletePost('1')
    .then(() => getPosts())
    .catch(err => {
      document.body.innerHTML = `<h2>${err}</h2>`;
    });
};

runPromisesAll();
