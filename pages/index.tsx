import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import prisma from '../lib/prisma';
import FormKQXS from "./detail";

type Kqxs = {
  giaidb: string,
  giai1: string,
  giai2: string,
  giai3_1: string,
  giai3_2: string,
  giai3_3: string,
  giai4_1: string,
  giai4_2: string,
  giai4_3: string,
  giai4_4: string,
  giai4_5: string,
  giai4_6: string,
  giai4_7: string,
  giai5: string,
  giai6_1: string,
  giai6_2: string,
  giai6_3: string,
  giai7: string,
  giai8: string,
  expirationTime: string,
  currentLoading: string,
};

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
