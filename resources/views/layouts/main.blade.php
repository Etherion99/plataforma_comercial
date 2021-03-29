<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title')</title>

    @section('styles')
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <link rel="stylesheet" href="{{ asset('css/templates/style.css') }}">
        <link rel="stylesheet" href="{{ asset('css/templates/flaticon.css') }}">
    @show

    @section('scripts')
        <script src="{{ asset('js/app.js') }}"></script>
        <script src="https://unpkg.com/ionicons@5.4.0/dist/ionicons.js"></script>
    @show
</head>
<body>
    @section('content')

    @show
</body>
</html>
