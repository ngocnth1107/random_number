import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import prisma from '../lib/prisma';
import FormKQXS from "./detail";

export const getStaticProps: GetStaticProps = async () => {
  const post = await prisma.kqxs.findUnique({
    where: { id: '1' },
  });

  return {
    props: {
      post,
    },
  };
};

const Blog = ({ post }) => {
  console.log("post", post)

  return (
    <Layout>
      <FormKQXS kqxs={post} />
    </Layout>
  );
};

export default Blog;
