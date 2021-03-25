@extends('layouts.main')

@section('title', 'prueba')

@section('styles')
    @parent
    <link rel="stylesheet" href="{{ asset('css/home.css') }}">
@endsection

@section('scripts')
    @parent
    <script src="https://unpkg.com/ionicons@5.4.0/dist/ionicons.js"></script>
    <script src="{{ asset('js/home.js') }}" defer></script>
@endsection

@section('content')
    @include('components.header')
    @include('components.loader')
    <!-- Hero Start-->
    <div class="hero-area2  slider-height2 hero-overly2 d-flex align-items-center ">
        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <div class="hero-cap text-center pt-50">
                        <h2>Nosotros</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--Hero End -->
    <!-- About Details Start -->
    <div class="about-details section-padding2">
        <div class="container">
            <div class="row">
                <div class="col-lg-10 col-md-10">
                    <!-- Section Tittle -->
                    <div class="section-tittle section-tittle5 mb-80">
                        <span>Acerca de nuestra compañía</span>
                        <h2>Plataforma comercial S.A.S</h2>
                    </div>
                </div>
            </div>
            <div class="row justify-content-between">
                <div class="col-lg-4">
                    <h3>Nuestra misión</h3>
                    <p>Brindar a la comunidad Huilense un Directorio Web que permita fortalecer e impulsar el comercio
                        de la región a la vanguardia con las nuevas necesidades de los usuarios. </p>
                </div>
                <div class="col-lg-5">
                    <h3>Nuestra visión</h3>
                    <p>Plataforma comercial S.A.S en el 2024 será la mejor plataforma web en el Huila, reconocida por su
                        confiabilidad y eficiencia.</p>
                </div>
            </div>
        </div>
    </div>
    <!-- About Details End -->
    <!-- peoples-visit Start -->
    <div class="peoples-visit dining-padding-top">
        <!-- Single Left img -->
        <div class="single-visit left-img">
            <div class="container">
                <div class="row justify-content-end">
                    <div class="col-lg-8">
                        <div class="visit-caption">
                            <h3>¿Quienes somos?</h3>
                            <p>Plataforma Comercial S.A.S es un directorio web diseñado de forma organizada, donde
                                puedes encontrar información de contacto y ubicación de empresas por categorías de los
                                productos y servicios que ofertan, haciendo más fácil tú búsqueda. Además, puedes
                                encontrar información de las noticias mas importantes de nuestra ciudad y ofertas de
                                empleo.</p>
                            <span>¿Cuáles son nuestros beneficios?</span>

                            <!--Single Visit categories -->
                            <div class="visit-categories mb-40">
                                <div class="visit-location">
                                    <span><ion-icon name="business-outline"></ion-icon></span>
                                </div>
                                <div class="visit-cap">
                                    <h4>Empresa</h4>
                                    <p>Contribuir a las PYMES aumentar su visibilidad en el mercado.</p>
                                    <p>Facilitar la ubicación de su empresa en la internet, enlazándolo con sus páginas
                                        y/o redes.</p>
                                    <p>Ampliar sus ventas y clientes.</p>
                                </div>
                            </div>
                            <!--Single Visit categories -->
                            <div class="visit-categories">
                                <div class="visit-location">
                                    <span><ion-icon name="people-outline"></ion-icon></span>
                                </div>
                                <div class="visit-cap">
                                    <h4>Usuarios</h4>
                                    <p>Encontraras información verídica, confiable y clasificada en un mismo lugar.</p>
                                    <p>Facilitar la navegación, localización y mercadeo.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- peoples-visit End -->
    <!-- Services Area Start -->
    <div class="services-area pt-150 pb-150 section-bg" data-background="{{asset('img/gallery/section_bg02.jpg')}}">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <!-- Section Tittle -->
                    <div class="section-tittle section-tittle2 text-center mb-80">
                        <span>Fácil de encontrarte</span>
                        <h2>¿Cómo participas?</h2>
                    </div>
                </div>
            </div>
            <div class="row justify-content-between">
                <div class="col-lg-3 col-md-6">
                    <div class="single-services text-center mb-50">
                        <div class="services-icon">
                            <span class="flaticon-list"></span>
                        </div>
                        <div class="services-cap">
                            <h5><a href="#">1. Selecciona una categoria</a></h5>
                            <p>incidid labore lore magna aliqua uisipsum suspendis loris.</p>
                        </div>
                        <!-- Shpape -->
                        <img class="shape1 d-none d-lg-block" src="{{asset('img/icon/serices1.png')}}" alt="">
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="single-services text-center mb-50">
                        <div class="services-icon">
                            <span class="flaticon-problem"></span>
                        </div>
                        <div class="services-cap">
                            <h5><a href="#">2. Elige tu plan</a></h5>
                            <p>incidid labore lore magna aliqua uisipsum suspendis loris.</p>
                        </div>
                        <img class="shape2 d-none d-lg-block" src="{{asset('img/icon/serices2.png')}}" alt="">
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="single-services text-center mb-50">
                        <div class="services-icon">
                            <span class="flaticon-respect"></span>
                        </div>
                        <div class="services-cap">
                            <h5><a href="#">3. Disfruta de todos nuestros servicios</a></h5>
                            <p>incidid labore lore magna aliqua uisipsum suspendis loris.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Services Area End -->

    @include('components.footer')
    @include('components.scrollup')
@endsection
