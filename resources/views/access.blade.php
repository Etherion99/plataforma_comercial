@extends('layouts.main')

@section('title', 'Acceso')

@section('styles')
    @parent
    <link rel="stylesheet" href="{{ asset('css/access.css') }}">
@endsection

@section('scripts')
    @parent
    <script>
        var signupURL = '{{ route('companySignup') }}';
        var plan = '{{ $plan }}';
    </script>
    <script src="{{ asset('js/access.js') }}" defer></script>
@endsection

@section('content')
    @include('components.header')
    @include('components.loader')

    <!--Modal Add Phone Start-->
    <div class="modal fade" tabindex="-1" id="add-phone-modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Nuevo Número Telefónico</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="alert alert-warning alert-dismissible fade show mx-2 col" id="alertPhoneModal" style="display: none">
                            <div id="messagePhone"></div>
                            <button type="button" class="close" aria-label="Close"
                                    id="closeAlertScheduleModal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                    <div class="row d-flex justify-content-center mt-3">
                        <div class="form-group col">
                            <label for="phone-number" class="color-main"><strong>Número</strong></label>
                            <input type="number" class="form-control" name="phone-number" id="phone-number">
                            <small class="form-text text-danger font-weight-bold form-input-alert"></small>
                        </div>
                        <div class="form-group col">
                            <label for="phone-type" class="color-main"><strong>Tipo</strong></label>
                            <select name="phone-type" id="phone-type" class="wide">
                                <option value="">Seleccione</option>
                                @foreach($phoneTypes as $phoneType)
                                    <option value="{{ $phoneType->id }}">{{ $phoneType->name }}</option>
                                @endforeach
                            </select>
                            <small class="form-text text-danger font-weight-bold form-input-alert"></small>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-main-square" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-main-square ml-3" id="add-phone">Agregar</button>
                </div>
            </div>
        </div>
    </div>
    <!--Modal Add Phone End-->

    <!--Modal add Schedule Start-->
    <div class="modal fade" tabindex="-1" id="add-schedule-modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="add-schedule-modalLabel">Añadir nuevo horario</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="alert alert-warning alert-dismissible fade show" id="alertScheduleModal" role="alert" style="display: none">
                            <div id="messageSchedule"></div>
                            <button type="button" class="close" aria-label="Close"
                                    id="closeAlertScheduleModal">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="form-row" id="select-for-days">
                            <div class="form-group col-md-12">
                                <label for="select-days">Día de la semana</label> <br>
                                <select class="form-control wide" name="days" id="select-days">
                                    <option value="0">Domingo</option>
                                    <option value="1">Lunes</option>
                                    <option value="2">Martes</option>
                                    <option value="3">Miércoles</option>
                                    <option value="4">Jueves</option>
                                    <option value="5">Viernes</option>
                                    <option value="6">Sábado</option>
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="select-first-hour">Hora Inicio</label>
                                <input type="time" class="form-control" id="select-first-hour">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="select-last-hour">Hora Fin</label>
                                <input type="time" class="form-control" id="select-last-hour">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-main-square ml-3" data-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-main-square ml-3" id="add-schedule">Añadir</button>
                </div>
            </div>
        </div>
    </div>
    <!--Modal add Schedule End-->

    <!-- Hero Start-->
    <div class="hero-area2 slider-height2 hero-overly2 d-flex align-items-center"
         style="background-image: url({{ asset('images/hero/hero2.jpg') }})">
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
            <div class="form-step rounded-circle d-flex justify-content-center align-items-center p-3 mx-4 filled"
                 data-id="0">
                <i class="fas fa-clipboard-list fa-2x"></i>
            </div>
            <div class="form-step rounded-circle d-flex justify-content-center align-items-center p-3 mx-4 filled"
                 data-id="1">
                <i class="fas fa-concierge-bell fa-2x"></i>
            </div>
            <div class="form-step rounded-circle d-flex justify-content-center align-items-center p-3 mx-4" data-id="2">
                <i class="fas fa-phone fa-2x"></i>
            </div>
            <div class="form-step rounded-circle d-flex justify-content-center align-items-center p-3 mx-4" data-id="3">
                <i class="fas fa-camera fa-2x"></i>
            </div>
        </div>
        <div class="row my-5 py-3">
            <div class="form-container col-8 offset-2" data-id="0">
                <div class="d-none" id="categories-optgroups">
                    @foreach($categories as $category)
                        <optgroup id="categories-optgroup-{{ $category['id'] }}">
                            @foreach($category['categories'] as $subcategory)
                                <option value="{{ $subcategory['id'] }}">{{ $subcategory['name'] }}</option>
                            @endforeach
                        </optgroup>
                    @endforeach
                </div>
                <div class="row mt-3 mb-5 d-flex justify-content-center">
                    <h3 class="color-main font-weight-bold">Información de la Empresa</h3>
                </div>
                <div class="row d-flex justify-content-center">
                    <div class="form-group col-4">
                        <p class="color-main text-center"><strong>Logo</strong></p>
                        <input type="file" class="d-none input-photo" data-id="0" id="logo">
                        <div class="photo rounded-circle embed-responsive embed-responsive-1by1 d-flex align-items-center justify-content-center" data-id="0">
                            <i class="fas fa-portrait"></i>
                        </div>
                        <small class="form-text text-danger text-center mt-3 font-weight-bold form-input-alert"></small>
                    </div>
                </div>
                <div class="row d-flex justify-content-center mt-5">
                    <div class="form-group col">
                        <label for="name" class="color-main"><strong>Nombre</strong></label>
                        <input type="text" class="form-control" name="name" id="name">
                        <small class="form-text text-danger font-weight-bold form-input-alert"></small>
                    </div>
                    <div class="form-group col">
                        <label for="pack" class="color-main"><strong>Plan</strong></label>
                        <select id="pack" class="wide" disabled>
                            <option value="">Seleccione</option>
                            @foreach($packs as $pack)
                                <option value="{{ $pack->id }}" {{ $pack->id == $plan ? 'selected' : '' }}>{{ $pack->name }}</option>
                            @endforeach
                        </select>
                        <small class="form-text text-danger font-weight-bold form-input-alert"></small>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col">
                        <label for="group" class="color-main"><strong>Grupo</strong></label>
                        <select id="group" class="wide">
                            <option value="">Seleccione</option>
                            @foreach($categories as $category)
                                <option value="{{ $category['id'] }}">{{ $category['name'] }}</option>
                            @endforeach
                        </select>
                        <small class="form-text text-danger font-weight-bold form-input-alert"></small>
                    </div>
                    <div class="form-group col">
                        <label for="category" class="color-main"><strong>Categoría</strong></label>
                        <select id="category" class="wide" disabled>
                            <option value="">Seleccione</option>
                        </select>
                        <small class="form-text text-danger font-weight-bold form-input-alert"></small>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="form-group col">
                        <label for="description" class="color-main"><strong>Descripción</strong></label>
                        <textarea name="description" class="form-control" id="description" rows="5" placeholder="Descríbenos brevemente tu empresa, los productos que vende o servicios que presta..."></textarea>
                        <small class="form-text text-danger font-weight-bold form-input-alert"></small>
                    </div>
                </div>
            </div>
            <div class="form-container col-8 offset-2" data-id="1">
                <div class="row mt-3 mb-5 d-flex justify-content-center">
                    <h3 class="color-main font-weight-bold">Servicios</h3>
                </div>
                <div class="form-group">
                    <div id="schedules">
                        <div class="row d-flex align-items-center">
                            <div class="col text-center">
                                <button class="btn btn-main-square ml-3" data-toggle="modal" data-target="#add-schedule-modal"
                                        data-whatever="@getbootstrap"><i class="fa fa-plus"></i> Agregar Horario
                                </button>
                            </div>
                        </div>
                        <div class="row d-flex align-items-center my-4" id="day-0">
                            <h3 class="col-3 m-0">Domingo</h3>
                        </div>
                        <div class="row d-flex align-items-center my-4" id="day-1">
                            <h3 class="col-3 m-0">Lunes</h3>
                        </div>
                        <div class="row d-flex align-items-center my-4" id="day-2">
                            <h3 class="col-3 m-0">Martes</h3>
                        </div>
                        <div class="row d-flex align-items-center my-4" id="day-3">
                            <h3 class="col-3 m-0">Miércoles</h3>
                        </div>
                        <div class="row d-flex align-items-center my-4" id="day-4">
                            <h3 class="col-3 m-0">Jueves</h3>
                        </div>
                        <div class="row d-flex align-items-center my-4" id="day-5">
                            <h3 class="col-3 m-0">Viernes</h3>
                        </div>
                        <div class="row d-flex align-items-center my-4" id="day-6">
                            <h3 class="col-3 m-0">Sábado</h3>
                        </div>
                    </div>
                    <small class="form-text text-danger text-center mt-3 font-weight-bold form-input-alert"></small>
                </div>
                <div class="row mt-5 pt-5">
                    <div class="form-group col">
                        <label class="color-main checkbox-inline control-label"><strong>Métodos de Pago</strong></label>
                        <div id="payment_methods">
                            @foreach($paymentMethods as $paymentMethod)
                                <div class="form-check">
                                    <input class="form-check-input payment-method" type="checkbox" id="payment-method-{{ $paymentMethod->id }}" value="{{ $paymentMethod->id }}">
                                    <label class="form-check-label" for="payment-method-{{ $paymentMethod->id }}">{{ $paymentMethod->name }}</label>
                                </div>
                            @endforeach
                        </div>
                        <small class="form-text text-danger font-weight-bold form-input-alert"></small>
                    </div>
                    <div class="form-group col">
                        <label for="delivery" class="color-main"><strong>Domicilios</strong></label>
                        <select id="delivery" class="wide">
                            <option value="">Seleccione</option>
                            <option value="1">Sí</option>
                            <option value="0">No</option>
                        </select>
                        <small class="form-text text-danger font-weight-bold form-input-alert"></small>
                    </div>
                </div>
            </div>
            <div class="form-container col-8 offset-2" data-id="2">
                <div class="d-none" id="municipalities-optgroups">
                    @foreach($departments as $department)
                        <optgroup id="municipalities-optgroup-{{ $loop->index }}">
                            @foreach($department['municipalities'] as $municipality)
                                <option value="{{ $municipality['id'] }}">{{ $municipality['name'] }}</option>
                            @endforeach
                        </optgroup>
                    @endforeach
                </div>
                <div class="row mt-3 mb-5 d-flex justify-content-center">
                    <h3 class="color-main font-weight-bold">Ubicación y Contacto</h3>
                </div>
                <div class="row d-flex justify-content-center mt-3">
                    <div class="form-group col">
                        <label for="department" class="color-main"><strong>Departamento</strong></label>
                        <select name="department" id="department" class="wide">
                            <option value="">Seleccione</option>
                            @foreach($departments as $department)
                                <option value="{{ $loop->index }}">{{ $department['name'] }}</option>
                            @endforeach
                        </select>
                        <small class="form-text text-danger font-weight-bold form-input-alert"></small>
                    </div>
                    <div class="form-group col">
                        <label for="municipality" class="color-main"><strong>Municipio</strong></label>
                        <select name="municipality" id="municipality" class="wide" disabled>
                            <option value="">Seleccione</option>
                        </select>
                        <small class="form-text text-danger font-weight-bold form-input-alert"></small>
                    </div>
                    <div class="form-group col">
                        <label for="address" class="color-main"><strong>Dirección</strong></label>
                        <input type="text" class="form-control" name="address" id="address">
                        <small class="form-text text-danger font-weight-bold form-input-alert"></small>
                    </div>
                </div>
                <div class="row mt-5 mb-3">
                    <h4 class="color-main">Teléfonos</h4>
                </div>
                <div class="row">
                    <div class="form-group col">
                        <div class="row d-flex justify-content-center" id="phones"></div>
                        <div class="row col d-flex justify-content-center my-5 mx-0">
                            <button class="btn btn-main-square" data-toggle="modal" data-target="#add-phone-modal">
                                <i class="fas fa-plus"></i> Agregar teléfono
                            </button>
                        </div>
                        <small class="form-text text-danger text-center font-weight-bold form-input-alert"></small>
                    </div>
                </div>
                <div class="row mt-5">
                    <h4 class="color-main">Redes</h4>
                </div>
                <div class="row mt-3 d-flex justify-content-center" id="social-networks">
                    @foreach($socialNetworks as $socialNetwork)
                        <div class="social-network form-group col-6">
                            <label for="social-network-{{ $socialNetwork->id }}" class="color-main"><strong>{{ $socialNetwork->name }}</strong></label>
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <div class="input-group-text"><i class="{{ $socialNetwork->icon }}"></i></div>
                                </div>
                                <input type="text" placeholder="Enlace de tu {{ $socialNetwork->name }}" class="form-control" data-id="{{ $socialNetwork->id }}"pppppppp>
                            </div>
                            <small class="form-text text-danger font-weight-bold form-input-alert"></small>
                        </div>
                    @endforeach
                </div>
            </div>
            <div class="form-container col-8 offset-2" data-id="3">
                <div class="row photos-form">
                    @for($i = 1; $i <= 12; $i++)
                        <div class="col-4 p-3">
                            <input type="file" class="d-none input-photo" data-id="{{ $i }}">
                            <div class="photo embed-responsive embed-responsive-1by1 d-flex align-items-center justify-content-center" data-id="{{ $i }}">
                                <i class="fas fa-image"></i>
                            </div>
                        </div>
                    @endfor
                </div>
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
