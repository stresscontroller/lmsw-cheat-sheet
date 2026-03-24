'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Script from 'next/script';

const metaMap: Record<string, { title: string; description: string }> = {
    '/': {
        title: 'LMSW Cheat Sheet | LMSW Exam Prep Made Simple',
        description:
            'Smarter prep for the LMSW exam. Get a free tutoring session, strategy-packed cheat sheet, and tools that actually help you pass the ASWB exam with confidence.',
    },
    '/free-tutoring-session': {
        title: 'LMSW Cheat Sheet | Free LMSW Tutoring Session',
        description:
            'Book a free 20-minute LMSW exam strategy session with the creator of LMSW Cheat Sheet. Get clarity, support, and a personalized study plan.',
    },
    '/enroll-now': {
        title: 'LMSW Cheat Sheet | Enroll Now for LMSW Exam Success',
        description:
            'Get the full LMSW Cheat Sheet system\u201480 pages of strategy, questions, and Deep Dives. Everything you need to pass the LMSW exam, all in one place.',
    },
    '/my-learning': {
        title: 'LMSW Cheat Sheet | Your LMSW Learning Dashboard',
        description:
            'Stay on track with your LMSW study plan. Access your cheat sheet, sessions, and practice tools—all in one place, built for focus and results.',
    },
    '/cheatsheet': {
        title: 'LMSW Cheat Sheet | What’s Inside the Cheat Sheet',
        description:
            'Not just notes—this is the LMSW strategy system used by future social workers to pass with confidence. Practice questions, test hacks, and decision-making tools built to win.',
    },
    '/about-us': {
        title: 'LMSW Cheat Sheet | Meet the Creator',
        description:
            'Learn how the LMSW Cheat Sheet was created and why it\u2019s helping social workers pass with confidence. Built by someone who cracked the code.',
    },
    '/faq': {
        title: 'LMSW Cheat Sheet | Frequently Asked Questions',
        description:
            'Have questions about the LMSW Cheat Sheet, Deep Dives, or tutoring? Get clear answers about our exam prep system and how it helps you pass faster.',
    },
    '/privacy-policy': {
        title: 'LMSW Cheat Sheet | Privacy Policy for LMSW Exam Prep',
        description:
            'See how LMSW Cheat Sheet protects your personal data\u2014tutoring sessions, billing info, and study activity\u2014for secure, trusted LMSW exam prep.',
    },
    '/terms-of-service': {
        title: 'LMSW Cheat Sheet | Terms of Service for LMSW Study Tools',
        description:
            'Review LMSW Cheat Sheet\u2019s terms for tutoring, digital study tools, exam prep access, and account use. Clear, fair, and built for LMSW test-takers.',
    },
    '/login': {
        title: 'LMSW Cheat Sheet | Login',
        description:
            'Log in to your LMSW Cheat Sheet account to access your exam prep materials, strategy tools, and session details.',
    },
    '/404': {
        title: 'LMSW Cheat Sheet | Page Not Found',
        description: 'This page doesn\u2019t exist\u2014but your LMSW prep journey is still on track. Head back to the cheat sheet or book a free tutoring session.',
    }
};

const defaultMeta = {
    title: 'LMSW Cheat Sheet',
    description:
        'Master the LMSW exam with expert-led training, study guides, and support designed for future social workers. Start your journey with LMSW Cheat Sheet today.',
};

function useMetaPath() {
    const [metaPath, setMetaPath] = useState<string | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const node = document.querySelector('[data-meta-path]');
        if (node instanceof HTMLElement && node.dataset.metaPath) {
            setMetaPath(node.dataset.metaPath);
        } else {
            setMetaPath(pathname);
        }
    }, [pathname]);

    return metaPath;
}

export default function Head() {
    const metaPath = useMetaPath();
    const matchedKey = Object.keys(metaMap)
        .sort((a, b) => b.length - a.length)
        .find((key) => metaPath?.startsWith(key));

    const meta = matchedKey ? metaMap[matchedKey] : defaultMeta;

    return (
        <head>
            <title>{meta.title}</title>
            <meta name="description" content={meta.description} />
            <meta name="robots" content="index, follow" />
            <meta property="og:title" content={meta.title} />
            <meta property="og:description" content={meta.description} />
            <meta property="og:type" content="website" />

            {/* Favicon */}
            <link rel="icon" href="/favicon.ico" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />

            {/* Meta Ads Tracking */}
            <meta name="facebook-domain-verification" content="qacb7061lz9u0yevqg8coakn60cw5e" />

            {/* ✅ Meta Pixel Code */}
            <Script 
                id="meta-pixel" 
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '681694337562030');
                    fbq('track', 'PageView');
                    `,
                }}
            >
            </Script>
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{ display: 'none' }}
                    src="https://www.facebook.com/tr?id=681694337562030&ev=PageView&noscript=1"
                />
            </noscript>

            {/* GMT */}
            <Script
                id="gtm-head"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-55DHXVHD');
                    `,
                }}
            >
            </Script>
        </head>
    );
}
