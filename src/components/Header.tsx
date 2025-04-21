import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showHomeButton?: boolean;
  clickBackButton: () => void;
}

export default function Header({ title, showBackButton = true, showHomeButton = true, clickBackButton }: HeaderProps) {
  const router = useRouter();
  return (
    <div className="bg-beauty-purple w-full h-[60px] flex items-center px-6 relative">
      <div className="flex items-center">
        {showBackButton && (
          <button className="mr-3"
          onClick={() => {
            //  router.back() 
            clickBackButton();
           }}>
            <Image
              src="/estimate/back_arrow_white.svg"
              alt="Back"
              width={24}
              height={24}
            />
          </button>
        )}
        <h2 className="text-white text-base font-medium">{title}</h2>
      </div>

      {showHomeButton && (
        <Link href="/" className="absolute right-6">
          <Image
            src="/estimate/home.svg"
            alt="Home"
            width={24}
            height={24}
          />
        </Link>
      )}
    </div>
  );
}
