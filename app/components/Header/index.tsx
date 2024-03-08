'use client';
import Link from 'next/link';
import { AuthButton } from '../Profile';
import { usePathname } from 'next/navigation';
import { useFlags } from 'launchdarkly-react-client-sdk';
import HopLogo from '@/public/HopLogo.svg';
import Image from 'next/image';

export default function Header() {
  const pathname = usePathname();
  const { allowSignIn } = useFlags();

  return (
    <header className="flex flex-row justify-between items-center top-0 mt-4">
      <div className="self-center text-3xl pl-4 mt-2 md:pl-8">
        <Link href="/">
          <Image src={HopLogo} alt="Hop Logo" height={48} width={100} />
        </Link>
      </div>
      <div className="ml-auto" />
      {pathname != '/profile' && allowSignIn && (
        <div className="mx-2">
          <AuthButton />
        </div>
      )}
    </header>
  );
}
