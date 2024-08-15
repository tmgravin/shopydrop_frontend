import { redirect } from 'next/navigation';

export default function AccountIndexPage() {
  redirect('/user-account/orders');
}
