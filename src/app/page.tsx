import Link from "next/link";
import { MoveRight } from "lucide-react";
import { currentUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/max-width-wrapper";

const Home = async () => {
  const user = await currentUser();
  return (
    <MaxWidthWrapper className='mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center'>
      <div className='mx-auto mb-6 max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-100 bg-white px-7 py-2 shadow-md backdrop-blur-md transition-all hover:border-gray-300 hover:bg-white/50'>
        <p className='text-sm font-medium text-gray-800 cursor-pointer'>
          Welcome to Quill.
        </p>
      </div>
      <h1 className='max-w-4xl text-3xl sm:text-4xl text-gray-950 font-semibold md:text-6xl tracking-tight'>
        Chat with your <span className='text-gray-600'>documents</span> in
        seconds.
      </h1>
      <p className='mt-5 max-w-prose to-zinc-700 sm:text-lg'>
        Quill allows you have conversions with any PDF document in real-time.
        Simply upload your file and start chatting.
      </p>
      <Button asChild className='mt-5' size={"lg"}>
        {user ? (
          <Link href={"/dashboard"} className='font-semibold'>
            Dashboard
            <MoveRight className='ml-2' />
          </Link>
        ) : (
          <Link href={"/sign-in"} className='font-semibold'>
            Get Started
            <MoveRight className='ml-2' />
          </Link>
        )}
      </Button>

      {/* Features Section */}
      <div className='mx-auto my-32 max-w-5xl sm:mt-56'>
        <div className='md-12 px-6 sm:px-8'>
          <div className='mx-auto max-w-2xl sm:text-center'>
            <h2 className='mt-2 text-4xl font-semibold text-gray-900 lg:text-5xl'>
              Start chatting in minutes
            </h2>
            <p className='mt-4 text-xl text-gray-600'>
              Chatting with PDF files has never been easier than with Quill.
            </p>
          </div>
          <ol className='my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0'>
            <li className='md:flex-1'>
              <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
                <span className='text-sm font-medium text-gray-600'>
                  Step 1
                </span>
                <span className='text-xl font-semibold'>
                  Sign up for an account
                </span>
                <span className='mt-2 text-zinc-700'>
                  Either starting out with a free plan or choose our{" "}
                  <Link
                    href='/pricing'
                    className='text-gray-700 underline underline-offset-2'
                  >
                    pro plan
                  </Link>
                  .
                </span>
              </div>
            </li>
            <li className='md:flex-1'>
              <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
                <span className='text-sm font-medium text-gray-600'>
                  Step 2
                </span>
                <span className='text-xl font-semibold'>
                  Upload your PDF file
                </span>
                <span className='mt-2 text-zinc-700'>
                  We&apos;ll process your file and make it ready for you to chat
                  with.
                </span>
              </div>
            </li>
            <li className='md:flex-1'>
              <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
                <span className='text-sm font-medium text-gray-600'>
                  Step 3
                </span>
                <span className='text-xl font-semibold'>
                  Start asking questions
                </span>
                <span className='mt-2 text-zinc-700'>
                  It&apos;s that simple. Try out Quill today - it really takes
                  less than a minute.
                </span>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Home;
