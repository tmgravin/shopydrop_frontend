"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  // Helper function to determine active link class
  const getLinkClassName = (path: string) => 
    pathname === path ? 'text-blue-500' : 'text-black';

  return (
    <div className="relative left-0screen w-[20%]  items-center text-center  p-4 shadow-lg">
      <h2 className="text-lg font-semibold mb-6">Manage My Account</h2>
      <ul className="space-y-4">
        <li>
          <Link href="/user-account/profile" className={getLinkClassName('/user-account/profile')}>
            My Profile
          </Link>
        </li>
        <li>
          <Link href="/user-account/orders" className={getLinkClassName('/user-account/orders')}>
            My Orders
          </Link>
        </li>
        <li>
          <Link href="/user-account/returns" className={getLinkClassName('/user-account/returns')}>
            My Returns
          </Link>
        </li>
        <li>
          <Link href="/user-account/cancellations" className={getLinkClassName('/user-account/cancellations')}>
            My Cancellations
          </Link>
        </li>
        <li>
          <Link href="/user-account/reviews" className={getLinkClassName('/user-account/reviews')}>
            My Reviews
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
