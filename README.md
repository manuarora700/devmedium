I recently took a course on Next.js with Firebase by [Fireship.io](https://fireship.io) to essentially learn how to Integrate Next.js with Firebase services like Firestore, Storage, Real Time Database and Authentication. I learned quite a few things about how to beautifully extract features of Next.js like `Server-Side Rendering` and `Incremental Static Regeneration` and integrate them in a blogging platform, wherever they are most suitable.

A Detailed blog on the entire website on [Manu Arora - Blog](https://manuarora.in/blog/blogging-platform/nextjs)

The features of [DevMedium](https://devmedium.vercel.app) are:

- Server-Side rendered content on the go 🚀
- Image upload with Firebase storage 📸
- Create / Read / Update / Delete posts ✍🏻
- Custom Username creation 🙆🏻‍♂️
- Signin with Google 🤙🏻
- Incremental Static Regeneration, Static Site Generation 🦾
- Like other posts you love, Unlike if not ❤️
- Write posts in Markdown with Live Preview, Render in HTML 🌿

## Installation and Usage

```bash
git clone https://github.com/manuarora700/devmedium.git
cd devmedium
npm install
npm run dev
```

OR

```bash
git clone https://github.com/manuarora700/devmedium.git
cd devmedium
yarn
yarn dev
```

In the `lib/firebase.js` file, you'll require your own API keys from Firebase. To generate your own keys:

- Setup a firebase project on [Firebase](https://firebase.google.com)
- Once done, Goto `Project Settings`
- At the bottom, you'll find an option of `Deploy on web`
- Click on it, It'll generate a bunch of script tags for you
- Copy the firebaseConfig from the data provided, it'll look something like this:

```js
const firebaseConfig = {
  apiKey: "AIzaSyByt62FYwaMJoaZORJrA8z39k3cD8G8xwA",
  authDomain: "devmedium-8492f.firebaseapp.com",
  projectId: "devmedium-8492f",
  storageBucket: "devmedium-8492f.appspot.com",
  messagingSenderId: "656756526690",
  appId: "1:656756526690:web:0eef740346c7fbfa748b3b",
  measurementId: "G-KL5B7DTZ4Z",
};
```

- Copy paste your own firebase config file into lib/firebase.js and you'll be good to go.

## Application Breakdown

The application is divided into various categories, where each category serves its own purpose.

- `/pages/*` contains all the routes which are being served.
- `/components/*` contains all the reusable components which we import into our pages directory.
- `/lib/*` contains all the library methods and helper functions. For example, we keep custom Hooks, Firebase related things here.
- `/styles/*` contains all the styling related stuff.
- `/public/*` contains all the public facing data, like logos, client side JS etc.

Essentially, the application flow looks like this:

- A user comes, registers on the application.
- After successful registration, the user is redirected to the username screen, where they can generate a unique username.
- After successful username creation, they are redirected to the home page, where they can create posts.
- They can go to the homepage and see all the posts written by all the users.
- They can heart a post they like, or unheart it.
- On the admin page, A user can see their created posts.
- They can perform Create / Read / Update / Delete operations, all in real time.
- They can edit their content live in markdown, click on `preview` to get a real time preview of the blog they are about to publish.
- A user can decide to publish or unpublish a blog.

## Routes

All the routes are nexted under the `pages` folder.

- `/index.js` - Landing page, Render all the posts here with Like Counter feature and Load more feature.
- `enter.js` - A Login page, with Three components, 'SignIn', 'SignOut' and 'UserForm' which are rendered based on the Auth State of the user.
- `/[username]/index.js` - User Profile page, Here the user can see all the posts from him along with the username. This route is public, Anyone can see any user with their posts.
- `/[username]/[slug].js` - A Single post page, here the user can see the post in detail (The actual blog post).
- `/admin/index.js` - This is the Admin's psot page. See all your Published and unpublished posts. Also you create a new post here.
- `/admin/[slug].js` - Here you perform CRUD on whatever you post you want to, The slug is the unique identifier for the post you want to perfom CRUD on.

Additionally, firestore rules are deployed to make sure the database remains secure and is only accessed in a way we want.

## Important Decisions on SSR, ISR and SSG

While developing the application, It is really important to keep in mind which strategy you want to use and how do you plan on using it.
For example, The index page, i.e. the home page is dynamic in nature, that means the content on the page can change pretty often and we want to see the latest content there
for that scenario, we use `getServerSideProps` , i.e. Server-Side Rendering so that we get the most up to date page there.

For the `edit-post` page or the `posts` page, we use something called Incremental Static Regeneration, which means that we fetch the data after some time limit periodically.
On the posts page, we fetch the data every 100ms and see if it has changed. If it is not changed, we stick to the static version of the page. If it does infact change, we get the latest post from the server and cache it.

```jsx:/[username]/[slug].js
export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection("posts").doc(slug);
    post = postToJSON(await postRef.get());

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 100,
  };
}
```

Here, the `revalidate` option is responsible for fetching the data periodically.

Apart from that, all the other components which do not even require any data, can be generated as static HTML and rendered on the page.

## Miscellaneous

- The `HeartCounter` in itself is a component which is related to a Post and a User both. A Post can have Many hearts so it is a one-to-many relationship.
- The `Metatags` component is a reusable piece of component which can be used on every page to generate metatags for that page for every social media network or search engine bots.
- We have a custom `404 page` which is rendered when a page is not found.
  <Image
    src="/static/images/blogging-platform-nextjs/404.png"
    width={2418}
    height={1306}
  />
- We have a `AuthCheck` component which checks the Auth on every level of the tree. `useContext()` and `createContext()` is used for managing state (particularly Auth State) in the entire application.

That was a basic overview of the entire application. 🔥

[Live Demo](https://devmedium.vercel.app)
[Source Code](https://github.com/manuarora700/devmedium)
