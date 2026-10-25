import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="container-shell flex min-h-screen flex-col items-start justify-center gap-6">
      <p className="section-label">404 / SIGNAL NOT FOUND</p>
      <h1 className="section-heading">A path that doesn&apos;t<br /><span className="serif text-primary">lead anywhere. Yet.</span></h1>
      <p className="muted max-w-md text-sm">This page isn&apos;t part of the portfolio. Let&apos;s get you back to the work.</p>
      <Button asChild><Link href="/"><ArrowLeft aria-hidden="true" />Back to the portfolio</Link></Button>
    </main>
  );
}
