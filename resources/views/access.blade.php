@extends('layouts.main')

@section('title', 'Acceso')

@section('styles')
    @parent
    <link rel="stylesheet" href="{{ asset('css/access.css') }}">
@endsection

@section('scripts')
    @parent
    <script src="{{ asset('js/access.js') }}" defer></script>
@endsection

@section('content')
    @include('components.header')
    @include('components.loader')

    <!-- Hero Start-->
    <div class="hero-area2 slider-height2 hero-overly2 d-flex align-items-center" style="background-image: url({{ asset('images/hero/hero2.jpg') }})">
        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <div class="hero-cap text-center pt-50">
                        <h2>Regístrate o ingresa</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--Hero End -->

    <!--Login Start-->
    <div class="container my-5">
        <div class="row d-flex justify-content-center">
            <div class="card p-5 col-4">
                <form>
                    <div class="row d-flex justify-content-center">
                        <div class="form-group col-10">
                            <label for="login-email" class="color-main"><strong>Correo Electrónico</strong></label>
                            <input type="text" class="form-control" id="login-email" placeholder="ejemplo@correo.com">
                            <small></small>
                        </div>
                    </div>
                    <div class="row d-flex justify-content-center mt-3">
                        <div class="form-group col-10">
                            <label for="login-password" class="color-main"><strong>Contraseña</strong></label>
                            <input type="password" class="form-control" id="login-password" placeholder="••••••••">
                            <small></small>
                        </div>
                    </div>
                    <div class="row d-flex justify-content-center mt-3">
                        <button class="btn btn-main">Ingresar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!--Login End-->
    <!--Signup Start-->
    <div class="container my-5">
        <div class="row d-flex justify-content-center" id="form-steps">
            <div class="form-step rounded-circle d-flex justify-content-center align-items-center p-3 mx-4 filled" data-id="0">
                <i class="fas fa-clipboard-list fa-2x"></i>
            </div>
            <div class="form-step rounded-circle d-flex justify-content-center align-items-center p-3 mx-4 filled" data-id="1">
                <i class="fas fa-concierge-bell fa-2x"></i>
            </div>
            <div class="form-step rounded-circle d-flex justify-content-center align-items-center p-3 mx-4" data-id="2">
                <i class="fas fa-phone fa-2x"></i>
            </div>
            <div class="form-step rounded-circle d-flex justify-content-center align-items-center p-3 mx-4" data-id="3">
                <i class="fas fa-camera fa-2x"></i>
            </div>
        </div>
        <div class="row my-5 py-5">
            gg
        </div>
        <div class="row d-flex justify-content-center">
            <button class="btn btn-main mx-3">Anterior</button>
            <button class="btn btn-main mx-3">Siguiente</button>
            <button class="btn btn-main mx-3">Terminar</button>
        </div>
    </div>
    <!--Signup End-->

    @include('components.footer')
    @include('components.scrollup')
@endsection
