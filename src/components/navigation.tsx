"use client";

import { useEffect, useState } from "react";
import { m, useScroll, useSpring } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Menu } from "lucide-react";
import { navigation } from "@/data/portfolio";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function Navigation() {
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 180, damping: 35 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      }
    }, { rootMargin: "-15% 0px -65% 0px" });
    for (const item of navigation) {
      const element = document.getElementById(item.href.slice(1));
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <div className="container-shell nav-inner">
        <a className="brand" href="#top">
          <span className="brand-mark" aria-hidden="true">sm.</span>
          <span className="brand-name">Sandeep Modugu<span className="text-primary">.</span></span>
          <span className="sr-only">Home</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} aria-current={active === item.href ? "location" : undefined}>{item.label}</a>
          ))}
        </nav>
        <ThemeToggle />
        <a className="nav-contact" href="#contact">Contact <ArrowUpRight size={14} aria-hidden="true" /></a>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="mobile-menu-button" aria-label="Open navigation menu">
              <Menu size={20} aria-hidden="true" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Sections</DialogTitle>
              <DialogDescription>Jump to any part of the page.</DialogDescription>
            </DialogHeader>
            <nav aria-label="Mobile navigation" className="flex flex-col gap-2 pt-3">
              {[...navigation, { href: "#contact", label: "Contact" }].map((item) => (
                <DialogClose asChild key={item.href}>
                  <a href={item.href} className="flex min-h-12 items-center justify-between rounded-md px-3 text-lg hover:bg-secondary">
                    {item.label}<ArrowDownRight className="size-4 text-primary" aria-hidden="true" />
                  </a>
                </DialogClose>
              ))}
            </nav>
          </DialogContent>
        </Dialog>
      </div>
      <m.div aria-hidden="true" className="nav-progress" style={{ scaleX: reducedMotion ? scrollYProgress : smoothProgress }} />
    </header>
  );
}
