@extends('layouts.main')

@section('title', 'prueba')

@section('styles')
    @parent
    <link rel="stylesheet" href="{{ asset('css/home.css') }}">
@endsection

@section('scripts')
    @parent
    <script src="{{ asset('js/home.js') }}" defer></script>
@endsection

@section('content')
    @include('components.header')
    @include('components.loader')
    <div class="slider-area hero-overly" style="background-image: url({{ asset('images/hero/hero.jpg') }})">
        <div class="single-slider hero-overly  slider-height d-flex align-items-center">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-xl-8 col-lg-9 principal-search">
                        <!-- Hero Caption -->
                        <div class="hero__caption">
                            <span>Explore the city</span>
                            <h1>Discover Great Places</h1>
                        </div>
                        <!--Hero form -->
                        <form action="#" class="search-box">
                            <div class="input-form">
                                <input type="text" placeholder="What are you looking for?">
                            </div>
                            <div class="select-form">
                                <div class="select-itms">
                                    <select name="select" class="filter" id="group-filter">
                                        <option value="">Grupo</option>
                                        @foreach($groups as $group)
                                            <option value="{{ $group->id }}">{{ $group->name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="select-form">
                                <div class="select-itms">
                                    <select name="select" class="filter" id="category-filter" disabled>
                                        <option value="">Categoría</option>
                                    </select>
                                </div>
                            </div>
                            <div class="search-form">
                                <a href="#">Search</a>
                            </div>
                        </form>
                        <div class="search-results container">
                            <div class="row row-cols-1 row-cols-md-2 g-4 in-search-results">
                                <div class="col">
                                    <div class="row g-0 bg-light position-relative">
                                        <div class="col-md-3 mb-md-0 p-md-4">
                                            <img src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-social-logo.png"
                                                 class="w-100 rounded-circle" alt="...">
                                        </div>
                                        <div class="col-md-6 p-4 ps-md-0">
                                            <h5 class="mt-0">Company name</h5>
                                            <p>Category....</p>
                                            <a href="#" class="stretched-link">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="row g-0 bg-light position-relative">
                                        <div class="col-md-3 mb-md-0 p-md-4">
                                            <img src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-social-logo.png"
                                                 class="w-100 rounded-circle" alt="...">
                                        </div>
                                        <div class="col-md-6 p-4 ps-md-0">
                                            <h5 class="mt-0">Company name</h5>
                                            <p>Category....</p>
                                            <a href="#" class="stretched-link">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="row g-0 bg-light position-relative">
                                        <div class="col-md-3 mb-md-0 p-md-4">
                                            <img src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-social-logo.png"
                                                 class="w-100 rounded-circle" alt="...">
                                        </div>
                                        <div class="col-md-6 p-4 ps-md-0">
                                            <h5 class="mt-0">Company name</h5>
                                            <p>Category....</p>
                                            <a href="#" class="stretched-link">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="row g-0 bg-light position-relative">
                                        <div class="col-md-3 mb-md-0 p-md-4">
                                            <img src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-social-logo.png"
                                                 class="w-100 rounded-circle" alt="...">
                                        </div>
                                        <div class="col-md-6 p-4 ps-md-0">
                                            <h5 class="mt-0">Company name</h5>
                                            <p>Category....</p>
                                            <a href="#" class="stretched-link">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>


    <!--Hero Area End-->
    @include('components.footer')
    @include('components.scrollup')
@endsection
