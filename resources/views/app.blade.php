<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Civicon Nexus Engineering') }}</title>

        <!-- SEO Base Meta Tags -->
        <meta name="theme-color" content="#0b0c0a">
        <meta name="msapplication-TileColor" content="#0b0c0a">
        <meta name="application-name" content="Civicon Nexus Engineering">
        <meta name="apple-mobile-web-app-title" content="Civicon Nexus">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="format-detection" content="telephone=yes">

        <!-- Favicon -->
        <link rel="icon" type="image/jpeg" href="/images/logo.jpeg">
        <link rel="apple-touch-icon" href="/images/logo.jpeg">

        <!-- Web App Manifest -->
        <link rel="manifest" href="/manifest.json">

        <!-- Google Site Verification (replace with your actual verification code) -->
        {{-- <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" /> --}}

        <!-- Fonts: Archivo (variable width, display), Geist (text), Geist Mono (technical labels) -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..900&family=Geist:wght@300..700&family=Geist+Mono:wght@400;500&display=swap"
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
