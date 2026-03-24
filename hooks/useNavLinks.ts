import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface NavLink {
  href: string;
  label: string;
}

const useNavLinks = () => {
  const { data: session, status } = useSession();
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);

  useEffect(() => {
    const init = async () => {
      setNavLinks([
        {
          href: "/free-tutoring-session",
          label: "Free Tutoring Session",
        },
        { href: "/enroll-now", label: "Enroll Now" },
        { href: "/about-us", label: "About Us" },
        { href: "/faq", label: "FAQ" },
      ]);
      if (session && status === "authenticated") {
        try {
          const res = await fetch("/api/auth/get-profile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: session.user?.email }),
          });

          if (!res.ok) {
            throw new Error("Failed to fetch profile");
          }

          const data = await res.json();
          if (data.user && data.user.plan === "paid") {
            setNavLinks([
              {
                href: "/free-tutoring-session",
                label: "Free Tutoring Session",
              },
              { href: "/my-learning", label: "My Learning" },
              { href: "/about-us", label: "About Us" },
              { href: "/faq", label: "FAQ" },
            ]);
          }
        } catch (err) {
          console.error("Error fetching profile:", err);
        }
      }
    };

    init();
  }, [session, status]);

  return navLinks;
};

export default useNavLinks;
