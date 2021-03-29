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
    <!--<div class="container my-5">
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
    </div>-->
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
            <div class="form-container col-8 offset-2" data-id="0">
                <div class="row d-flex justify-content-center mt-3">
                    <div class="form-group col">
                        <label for="name" class="color-main"><strong>Nombre</strong></label>
                        <input type="text" class="form-control" id="name">
                        <small></small>
                    </div>
                    <div class="form-group col">
                        <label for="group" class="color-main"><strong>Grupo</strong></label>
                        <select id="group" class="wide">
                            <option value="">Seleccione</option>
                            <option value="">grupo 1</option>
                            <option value="">grupo 2</option>
                        </select>
                        <small></small>
                    </div>
                    <div class="form-group col">
                        <label for="category" class="color-main"><strong>Categoría</strong></label>
                        <select id="category" class="wide">
                            <option value="">Seleccione</option>
                            <option value="">categoría 1</option>
                            <option value="">categoría 2</option>
                        </select>
                        <small></small>
                    </div>
                </div>
            </div>
            <div class="form-container col-8 offset-2" data-id="1">
                <div class="row d-flex align-items-center my-3">
                    <h3 class="col-3 m-0">Lunes</h3>
                    <button class="btn btn-main-square ml-3"><i class="fa fa-plus"></i> Agregar Horario</button>
                </div>
                <div class="row d-flex align-items-center my-3">
                    <h3 class="col-3 m-0">Martes</h3>
                    <button class="btn btn-main-square ml-3"><i class="fa fa-plus"></i> Agregar Horario</button>
                </div>
                <div class="row d-flex align-items-center my-3">
                    <h3 class="col-3 m-0">Miércoles</h3>
                    <button class="btn btn-main-square ml-3"><i class="fa fa-plus"></i> Agregar Horario</button>
                </div>
                <div class="row mt-5 pt-5">
                    <div class="form-group col">
                        <label class="color-main checkbox-inline control-label"><strong>Métodos de Pago</strong></label>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
                            <label class="form-check-label" for="inlineCheckbox1">Efectivo</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
                            <label class="form-check-label" for="inlineCheckbox2">Tarjeta</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
                            <label class="form-check-label" for="inlineCheckbox2">Transferencia</label>
                        </div>
                    </div>
                    <div class="form-group col">
                        <label for="delivery" class="color-main"><strong>Domicilios</strong></label>
                        <select id="delivery" class="wide">
                            <option value="">Seleccione</option>
                            <option value="">Sí</option>
                            <option value="">No</option>
                        </select>
                        <small></small>
                    </div>
                </div>
            </div>
            <div class="form-container col-8 offset-2" data-id="2">
                contacto
            </div>
            <div class="form-container col-8 offset-2" data-id="3">
                fotos
            </div>
        </div>
        <div class="row d-flex justify-content-center">
            <button class="btn btn-main mx-3" id="nav-prev">Anterior</button>
            <button class="btn btn-main mx-3" id="nav-next">Siguiente</button>
            <button class="btn btn-main mx-3" id="nav-finish">Terminar</button>
        </div>
    </div>
    <!--Signup End-->

    @include('components.footer')
    @include('components.scrollup')
@endsection
