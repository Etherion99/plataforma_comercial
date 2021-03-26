@extends('layouts.main')

@section('title', 'prueba')

@section('styles')
    @parent
    <link rel="stylesheet" href="{{ asset('css/viewCompany.css') }}">
@endsection

@section('scripts')
    @parent
    <script src="{{ asset('js/viewCompany.js') }}" defer></script>
@endsection

@section('content')
    @include('components.header')
    @include('components.loader')

    <div id="cover">
        <div id="profile"></div>
    </div>

    @include('components.footer')
    @include('components.scrollup')
@endsection
