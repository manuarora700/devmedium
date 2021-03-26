import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import PostFeed from "../components/PostFeed";
import { firestore, fromMillis, postToJSON } from "../lib/firebase";

import { useState } from "react";
import Metatags from "@components/Metatags";

// Max post to query per page
const LIMIT = 5;

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: {
      posts,
    },
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const query = firestore
      .collectionGroup("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));

    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main>
      <Metatags
        title="Home Page"
        description="Get the latest posts on our site"
      />

      <div className="card card-info">
        <h2>💡 Next.js + Firebase - Blogging</h2>
        <p>
          Welcome! This app is built with Next.js and Firebase and is loosely
          inspired by Dev.to & Medium.
        </p>
        <p>
          Sign up for an 👨‍🎤 account, ✍️ write posts, then 💞 heart content
          created by other users. All public content is server-rendered and
          search-engine optimized.
        </p>
        <p>
          Thanks to Fireship.io for this amazing course on Next.js and Firebase.
        </p>
      </div>
      <PostFeed posts={posts} />

      {!loading && !postsEnd && (
        <button className="" onClick={getMorePosts}>
          Load More
        </button>
      )}
      <Loader show={loading} />

      {postsEnd && "You have reached the end"}
    </main>
  );
}
