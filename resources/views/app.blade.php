<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Civicon Nexus Engineering') }}</title>

        <!-- SEO Base Meta Tags -->
        <meta name="theme-color" content="#14202e">
        <meta name="msapplication-TileColor" content="#14202e">
        <meta name="application-name" content="Civicon Nexus Engineering">
        <meta name="apple-mobile-web-app-title" content="Civicon Nexus">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="format-detection" content="telephone=yes">

        <!-- Favicon -->
        <link rel="icon" type="image/png" href="/images/logo.png">
        <link rel="apple-touch-icon" href="/images/logo.png">

        <!-- Web App Manifest -->
        <link rel="manifest" href="/manifest.json">

        <!-- Google Site Verification (replace with your actual verification code) -->
        {{-- <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" /> --}}

        <!-- Fonts: Barlow (text) + Barlow Semi Condensed (headings) -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Barlow+Semi+Condensed:wght@600;700&display=swap"
            rel="stylesheet">

        <!-- Scripts -->
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
