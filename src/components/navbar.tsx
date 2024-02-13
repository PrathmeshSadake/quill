import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "./ui/button";

import MobileNav from "./mobile-nav";
import UserAccountNav from "./user-account-nav";
import MaxWidthWrapper from "./max-width-wrapper";
import { currentUser } from "@clerk/nextjs";

const Navbar = async () => {
  const user = await currentUser();

  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between '>
          <Link href='/' className='flex z-40 font-semibold'>
            <span>Quill.</span>
          </Link>

          <MobileNav isAuth={!!user} />

          <div className='hidden items-center space-x-4 sm:flex'>
            {!user ? (
              <>
                <Link
                  href='/pricing'
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Pricing
                </Link>
                <Link
                  href={"/sign-in"}
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Get started <ArrowRight className='ml-1.5 h-5 w-5' />
                </Link>
              </>
            ) : (
              <UserAccountNav
                name={
                  user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : "Your Account"
                }
                email={user.emailAddresses[0].emailAddress ?? ""}
                imageUrl={user.imageUrl ?? ""}
              />
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
