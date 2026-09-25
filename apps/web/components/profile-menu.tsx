'use client';

import { useClerk, useUser } from '@clerk/nextjs';
import { LayoutDashboard, Loader2, LogOut, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

const Avatar = ({ src, label, size }: { src?: string; label: string; size: string }) =>
  src ? (
    <img src={src} alt="" className={`${size} shrink-0 rounded-full object-cover`} />
  ) : (
    <span
      className={`${size} flex shrink-0 items-center justify-center rounded-full bg-[#06005A] text-sm font-semibold text-white`}
    >
      {label}
    </span>
  );

// Profile icon that opens our own account dialog instead of Clerk's popover.
export const ProfileMenu = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !signingOut) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, signingOut]);

  const name = user?.fullName || user?.firstName || 'Your account';
  const email = user?.primaryEmailAddress?.emailAddress ?? '';
  const initials = initialsOf(name) || 'U';

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut({ redirectUrl: '/' });
    } catch {
      setSigningOut(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open account menu"
        aria-haspopup="dialog"
        className="mt-1 rounded-full ring-2 ring-transparent transition hover:ring-[#06005A]/20 focus-visible:outline-none focus-visible:ring-[#06005A]/40 sm:mt-0"
      >
        <Avatar src={user?.imageUrl} label={initials} size="size-8" />
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
            onClick={() => !signingOut && setOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Account"
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={signingOut}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
              >
                <X className="size-4" />
              </button>

              <div className="flex flex-col items-center text-center">
                <Avatar src={user?.imageUrl} label={initials} size="size-16" />
                <p className="mt-4 text-lg font-bold text-[#000C3F]">{name}</p>
                {email && <p className="mt-0.5 text-sm text-gray-500">{email}</p>}
              </div>

              <div className="mt-6 flex flex-col gap-2.5">
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#06005A] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0a0080]"
                >
                  <LayoutDashboard className="size-4" />
                  My Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-gray-200 px-6 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-60"
                >
                  {signingOut ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <LogOut className="size-4" />
                  )}
                  {signingOut ? 'Logging out…' : 'Log out'}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};
