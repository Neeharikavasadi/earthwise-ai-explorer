
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import About from '@/components/home/About';

const Index: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <About />
    </Layout>
  );
};

export default Index;
