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

    <div id="cover" style="background-image: url('https://picsum.photos/1920/600?q={{ random_int(1, 25) }}')">
        <div id="profile">
            <img src="{{ asset('storage/company_logo/23.jpg') }}" class="rounded-circle">
        </div>
    </div>
    <div class="my-5 text-center">
        <h1><strong>{{ $company->name }}</strong></h1>
        <h3>{{ $company->category->name }}</h3>
    </div>


    @include('components.footer')
    @include('components.scrollup')
@endsection
