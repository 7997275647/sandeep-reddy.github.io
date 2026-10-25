import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="container-shell flex min-h-screen flex-col items-start justify-center gap-6">
      <p className="not-found-kicker">Page not found</p>
      <h1 className="section-heading">This page doesn&apos;t exist.</h1>
      <p className="muted max-w-md text-sm">The link may be old, or the page may have moved. You can head back to the portfolio from here.</p>
      <Button asChild><Link href="/"><ArrowLeft aria-hidden="true" />Back to the portfolio</Link></Button>
    </main>
  );
}
