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
    <!--Hero area start-->
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
                                <input type="text" placeholder="What are you looking for?" id="search-bar">
                            </div>
                            <div class="select-form">
                                <div class="select-itms">
                                    <select name="select" class="filter" id="group-filter">
                                        <option value="0">Grupo</option>
                                        @foreach($groups as $group)
                                            <option value="{{ $group->id }}">{{ $group->name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="select-form">
                                <div class="select-itms">
                                    <select name="select" class="filter" id="category-filter" disabled>
                                        <option value="0">Categoría</option>
                                    </select>
                                </div>
                            </div>
                            <div class="search-form">
                                <a href="#">Search</a>
                            </div>
                        </form>
                        <div class="container" id="search-results">
                            <div class="row row-cols-1 row-cols-md-2 g-4" id="in-search-results">

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!--Hero Area End-->

    <!-- Categories Section Start -->
    <div class="section-padding30">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <!-- Section Tittle -->
                    <div class="section-tittle text-center mb-80">
                        <span>Most visited places</span>
                        <h2>Popular Locations</h2>
                    </div>
                </div>
            </div>
            <div id="category-accordion">
                <div class="row d-flex justify-content-center">
                    @foreach($categories as $category)
                        <button class="btn btn-collapse mx-2 {{ $loop->index > 0 ? 'collapsed' : '' }}" data-toggle="collapse" data-target="#category-section-{{ $loop->index }}">{{ $category['name'] }}</button>
                    @endforeach
                </div>
                @foreach($categories as $category)
                    <div class="row mt-5 category-section collapse show" id="category-section-{{ $loop->index }}" data-parent="#category-accordion">
                        <div class="glider-contain">
                            <div class="glider">
                                @foreach($category['categories'] as $subcategory)
                                    <div class="p-4">
                                        <div class="category-card card h-100">
                                            <div class="card-body p-3">
                                                <img src="{{ asset('images/categories/'.$subcategory['id'].'.jpg') }}" class="img-fluid">
                                            </div>
                                            <div class="card-body p-3">
                                                <h5 class="text-center category-name">{{ $subcategory['name'] }}</h5>
                                            </div>
                                        </div>
                                    </div>
                                @endforeach
                            </div>

                            <button aria-label="Previous" class="glider-prev">«</button>
                            <button aria-label="Next" class="glider-next">»</button>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
    <!-- Categories Section End -->


    @include('components.footer')
    @include('components.scrollup')
@endsection
