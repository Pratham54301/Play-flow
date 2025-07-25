import PaymentForm from '@/components/payment-form';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background p-4 pt-10">
      <PaymentForm />
    </main>
  );
}
