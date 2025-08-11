
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function PayNowPage() {
  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <Card className="w-full max-w-md bg-secondary/50 border-border">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-extrabold">Payment Gateway</CardTitle>
          <CardDescription>
            This is a placeholder for the payment gateway integration.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
            <p className="text-muted-foreground">Click the button below to simulate returning to the dashboard.</p>
            <Button asChild className="w-full">
                <Link href="/dashboard">Return to Dashboard</Link>
            </Button>
        </CardContent>
      </Card>
    </main>
  );
}
