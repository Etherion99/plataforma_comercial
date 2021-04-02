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
    </script>
    <script src="{{ asset('js/access.js') }}" defer></script>
@endsection

@section('content')
    @include('components.header')
    @include('components.loader')

    <!--Modal Add Phone Start-->
    <div class="modal" tabindex="-1" id="add-phone-modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Nuevo Número Telefónico</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
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
                                <option value="1">Fijo</option>
                                <option value="2">Celular</option>
                                <option value="3">Whatsapp</option>
                                <option value="4">Llamadas y Whatsapp</option>
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
        <div class="row my-5 py-5">
            <div class="form-container col-8 offset-2" data-id="0">
                <div class="row d-flex justify-content-center">
                    <div class="col-4">
                        <p class="color-main text-center"><strong>Logo</strong></p>
                        <input type="file" class="d-none input-photo" data-id="0" id="logo">
                        <div class="photo rounded-circle embed-responsive embed-responsive-1by1 d-flex align-items-center justify-content-center" data-id="0">
                            <i class="fas fa-portrait"></i>
                        </div>
                    </div>
                </div>
                <div class="row d-flex justify-content-center mt-5">
                    <div class="form-group col">
                        <label for="name" class="color-main"><strong>Nombre</strong></label>
                        <input type="text" class="form-control" name="name" id="name" value="prueba">
                        <small class="form-text text-danger font-weight-bold form-input-alert"></small>
                    </div>
                    <div class="form-group col">
                        <label for="group" class="color-main"><strong>Grupo</strong></label>
                        <select id="group" class="wide filter">
                            <option value="0">Seleccione</option>
                            @foreach($groups as $group)
                                <option value="{{ $group->id }}">{{ $group->name }}</option>
                            @endforeach
                        </select>
                        <small class="form-text text-danger font-weight-bold form-input-alert"></small>
                    </div>
                    <div class="form-group col">
                        <label for="category" class="color-main"><strong>Categoría</strong></label>
                        <select id="category" class="wide filter" disabled>
                            <option value="0">Seleccione</option>
                        </select>
                        <small class="form-text text-danger font-weight-bold form-input-alert"></small>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="form-group col">
                        <label for="description" class="color-main"><strong>Descripción</strong></label>
                        <textarea name="description" class="form-control" id="description" rows="5" placeholder="Descríbenos brevemente tu empresa, los productos que vende o servicios que presta...">descripcion</textarea>
                        <small class="form-text text-danger font-weight-bold form-input-alert"></small>
                    </div>
                </div>
            </div>
            <div class="form-container col-8 offset-2" data-id="1">
                <div class="row d-flex align-items-center">
                    <div class="col text-center">
                        <button class="btn btn-main-square ml-3" data-toggle="modal" data-target="#exampleModal"
                                data-whatever="@getbootstrap"><i class="fa fa-plus"></i> Agregar Horario
                        </button>
                    </div>
                </div>
                <div class="row d-flex align-items-center my-3" id="day-0">
                    <h3 class="col-3 m-0">Lunes</h3>
                </div>
                <div class="row d-flex align-items-center my-3" id="day-1">
                    <h3 class="col-3 m-0">Martes</h3>
                </div>
                <div class="row d-flex align-items-center my-3" id="day-2">
                    <h3 class="col-3 m-0">Miércoles</h3>
                </div>
                <div class="row d-flex align-items-center my-3" id="day-3">
                    <h3 class="col-3 m-0">Jueves</h3>
                </div>
                <div class="row d-flex align-items-center my-3" id="day-4">
                    <h3 class="col-3 m-0">Viernes</h3>
                </div>
                <div class="row d-flex align-items-center my-3" id="day-5">
                    <h3 class="col-3 m-0">Sábado</h3>
                </div>
                <div class="row d-flex align-items-center my-3" id="day-6">
                    <h3 class="col-3 m-0">Domingo</h3>
                </div>

                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">New message</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="alert alert-warning alert-dismissible fade show" id="alertScheduleModal"
                                         role="alert" style="display: none">
                                        <div id="messageSchedule">jajjajaja</div>
                                        <button type="button" class="close" aria-label="Close"
                                                id="closeAlertScheduleModal">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="form-row" id="select-for-days">
                                        <div class="form-group col-md-12">
                                            <label for="select-days">Day</label> <br>
                                            <select class="form-control wide" name="days" id="select-days">
                                                <option value="0">Lunes</option>
                                                <option value="1">Martes</option>
                                                <option value="2">Miercoles</option>
                                                <option value="3">Jueves</option>
                                                <option value="4">Viernes</option>
                                                <option value="5">Sábado</option>
                                                <option value="6">Domingo</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="select-first-hour">Hora-Inicio</label>
                                            <input type="time" class="form-control" id="select-first-hour">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="select-last-hour">Hora-Fin</label>
                                            <input type="time" class="form-control" id="select-last-hour">
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-main-square ml-3" data-dismiss="modal">Close
                                </button>
                                <button type="button" class="btn btn-main-square ml-3" data-dismiss="modal"
                                        id="send-hour">Send message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-5 pt-5">
                    <div class="form-group col">
                        <label class="color-main checkbox-inline control-label"><strong>Métodos de Pago</strong></label>
                        @foreach($paymentMethods as $paymentMethod)
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="paymentMethods" value="option1">
                                <label class="form-check-label" for="inlineCheckbox1">{{ $paymentMethod->name }}</label>
                            </div>
                        @endforeach
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
                <div class="row d-flex justify-content-center mt-3">
                    <div class="form-group col">
                        <label for="department" class="color-main"><strong>Departamento</strong></label>
                        <select name="department" id="department" class="wide">
                            <option value="">Seleccione</option>
                            <option value="1">Huila</option>
                        </select>
                        <small class="form-text text-danger font-weight-bold form-input-alert"></small>
                    </div>
                    <div class="form-group col">
                        <label for="municipality" class="color-main"><strong>Municipio</strong></label>
                        <select name="municipality" id="municipality" class="wide">
                            <option value="">Seleccione</option>
                            <option value="1">La Plata</option>
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
                <div class="row" id="phones">

                </div>
                <div class="row d-flex justify-content-center my-5">
                    <button class="btn btn-main-square" data-toggle="modal" data-target="#add-phone-modal">
                        <i class="fas fa-plus"></i> Agregar teléfono
                    </button>
                </div>
            </div>
            <div class="form-container col-8 offset-2" data-id="3">
                <div class="row photos-form">
                    <div class="col-4 p-3">
                        <input type="file" class="d-none input-photo" data-id="1">
                        <div
                            class="photo embed-responsive embed-responsive-1by1 d-flex align-items-center justify-content-center"
                            data-id="0">
                            <i class="fas fa-image"></i>
                        </div>
                    </div>
                    <div class="col-4 p-3">
                        <input type="file" class="d-none input-photo" data-id="2">
                        <div
                            class="photo embed-responsive embed-responsive-1by1 d-flex align-items-center justify-content-center"
                            data-id="1">
                            <i class="fas fa-image"></i>
                        </div>
                    </div>
                    <div class="col-4 p-3">
                        <input type="file" class="d-none input-photo" data-id="3">
                        <div
                            class="photo embed-responsive embed-responsive-1by1 d-flex align-items-center justify-content-center"
                            data-id="2">
                            <i class="fas fa-image"></i>
                        </div>
                    </div>
                    <div class="col-4 p-3">
                        <input type="file" class="d-none input-photo" data-id="4">
                        <div
                            class="photo embed-responsive embed-responsive-1by1 d-flex align-items-center justify-content-center"
                            data-id="3">
                            <i class="fas fa-image"></i>
                        </div>
                    </div>
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
