<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Civicon Nexus Engineering') }}</title>

        <!-- SEO Base Meta Tags -->
        <meta name="theme-color" content="#0f172a">
        <meta name="msapplication-TileColor" content="#0f172a">
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

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
<link
href="https://fonts.bunny.net/css?family=plus-jakarta-sans:300,400,500,600,700,800|outfit:300,400,500,600,700,800,900&display=swap"
            rel="stylesheet" />

        <!-- Scripts -->
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
