import MaxWidthWrapper from "@/components/max-width-wrapper";

const Home = () => {
  return (
    <MaxWidthWrapper>
      <h1 className='text-4xl font-bold text-center'>Welcome to Next.js</h1>
      <p className='text-lg text-center mt-4'>
        Get started by editing <code>pages/index.tsx</code>
      </p>
    </MaxWidthWrapper>
  );
};

export default Home;
