@extends('layouts.main')

@section('title', $company->name)

@section('styles')
    @parent
    <link rel="stylesheet" href="{{ asset('css/viewCompany.css') }}">
@endsection

@section('scripts')
    @parent
    <script>
        let schedules = [
            [], // day-0
            [], // ....
            [],
            [],
            [],
            [],
            [] // day-6
        ];
        let schedulesPrueba = JSON.parse(`{!! json_encode($company->schedules) !!}`);
        console.log(schedulesPrueba)
        schedulesPrueba.forEach(element=>{
            schedules[element.day].push({start:element.start, end:element.end});
        });
        let icons = {};
        // Estructura que van a tener los horarios al ser recibidos por el backend
        // Ordenados pls (si puede)

    </script>
    <script src="{{ asset('js/viewCompany.js') }}" defer></script>
@endsection

@section('content')
    @include('components.header')
    @include('components.loader')

    <div id="cover" style="background-image: url('https://picsum.photos/1920/600?q={{ random_int(1, 25) }}')">
        <div class="container-fluid" id="profile">
            <div class="row justify-content-between">
                <div
                    class="col-sm-auto col-md-5 ml-md-auto d-flex align-items-end justify-content-center justify-content-lg-start">
                    <div>
                        <img src="{{ asset('storage/company_logo/'.$company->id.'.jpg') }}"
                             class="rounded-circle w-100">
                    </div>
                </div>
                <!-- Phones area start -->
                <div
                    class="col-sm-auto mt-3 col-md-5 d-flex align-items-end justify-content-lg-end justify-content-center mr-md-auto">
                    <div id="phones" class="float-right">
                        <ul class="list-group list-group-horizontal-xl">
                            @foreach($company->phones as $phone)
                                <li class="list-group-item">
                                    <span>{{ $phone->number }}</span>
                                    <div class="rounded-circle d-inline-block">
                                        <div>
                                            @foreach(json_decode($phone->phoneType->icons) as $icon)
                                                <i class="{{ $icon }} mr-1"></i>
                                            @endforeach
                                        </div>
                                    </div>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                </div>
                <!-- Phones area end -->
            </div>
        </div>
    </div>

    <div class="my-5 text-center">
        <h1><strong>{{ $company->name }}</strong></h1>
        <h3>{{ $company->category->name }}</h3>
    </div>
    <div class="container border-top-line">
        <button class="btn-menu text-left" type="button" data-toggle="collapse"
                data-target="#information"
                aria-expanded="true" aria-controls="information">
            Información
        </button>
        <button class="btn-menu text-left collapsed" type="button" data-toggle="collapse"
                data-target="#photos" aria-expanded="false" aria-controls="photos">
            Fotos
        </button>
    </div>
    <!-- Modal to view photos start -->
    <div class="modal" tabindex="-1" id="viewPhotosModal">
        <div class="modal-dialog modal-dialog-centered justify-content-center" id="modal-xxl">
            <div class="modal-content w-auto">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body p-0">
                    <img src="" alt="" id="imgInModal">
                </div>
                {{--                <div class="modal-footer">--}}
                {{--                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>--}}
                {{--                    <button type="button" class="btn btn-primary">Save changes</button>--}}
                {{--                </div>--}}
            </div>
        </div>
    </div>
    <!-- Modal to view photos end -->

    <div id="main-content" class="accordion">
        <!-- Information Area Start -->
        <div class="container collapse show" data-parent="#main-content" id="information">
            <div class="row d-flex align-items-lg-stretch">
                <div class="col-xl-5 col-lg-5 col-md-12 col-sm-12 p-0">
                    <div class="text-information h100">
                        <h3>Detalles</h3>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item border-0 pl-0"><i class="fa fa-map-marker-alt"></i>
                                <span>{{ $company->address->text .', '.$company->address->municipality->name.', '.$company->address->municipality->department->name}}</span>
                            </li>
                            <li class="list-group-item border-0 pl-0">
                                <i class="fa fa-truck"></i>
                                <span> Domicilios: {{ $company->delivery==1?'Si':'No' }}</span>
                            </li>
                            <li class="list-group-item border-0 pl-0"><i class="fas fa-shopping-cart"></i>
                                <span>Métodos de pago</span>
                                <ul class="list-group list-group-flush">
                                    @foreach($company->paymentMethods as $method)
                                        <li class="list-group-item">
                                            <div class="d-inline-block" id="method-{{ $method->pivot->payment_method_id }}">
                                            </div>
                                            <span>{{ $method->name }}</span>
                                        </li>
                                    @endforeach
                                </ul>
                            </li>
                        </ul>

                    </div>
                </div>
                <div class="col-xl-7 col-lg-7 col-md-12 col-sm-12 p-0">
                    <div class="text-information">
                        <h3>Descripción: </h3>
                        <p>{{ $company->description }}</p>
                    </div>
                    <div class="text-information">
                        <h3>Horarios</h3>
                        <div class="border-top-line">
                            <button class="btn-menu d-flex align-items-center text-left collapsed w-100" type="button"
                                    data-toggle="collapse"
                                    data-target="#collapseSchedule" aria-expanded="true" aria-controls="collapseOne"
                                    id="todaySchedule">
                                <span>Hoy </span>
                                <div class="d-inline-block viewUniqueSchedule text-success">Abierto</div>
                            </button>
                        </div>
                        <div class="collapse" id="collapseSchedule">
                            <div class="card card-body">
                                <table class="table table-borderless">
                                    <tbody>
                                    <tr>
                                        <th scope="row">Domingo</th>
                                        <td id="day-0">
                                            <div class="d-inline-block viewUniqueSchedule text-danger">Cerrado</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Lunes</th>
                                        <td id="day-1">
                                            <div class="d-inline-block viewUniqueSchedule text-danger">Cerrado</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Martes</th>
                                        <td id="day-2">
                                            <div class="d-inline-block viewUniqueSchedule text-danger">Cerrado</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Miércoles</th>
                                        <td id="day-3">
                                            <div class="d-inline-block viewUniqueSchedule text-danger">Cerrado</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Jueves</th>
                                        <td id="day-4">
                                            <div class="d-inline-block viewUniqueSchedule text-danger">Cerrado</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Viernes</th>
                                        <td id="day-5">
                                            <div class="d-inline-block viewUniqueSchedule text-danger">Cerrado</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Sábado</th>
                                        <td id="day-6">
                                            <div class="d-inline-block viewUniqueSchedule text-danger">Cerrado</div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Information Area Start -->
        <!-- Fotos Area Start -->
        <div class="container collapse" data-parent="#main-content" id="photos">
            <div class="row">
                <div class="col-12 p-0">
                    <div class="text-information">
                        <h3>Fotos</h3>
                        <div class="row">
                            @foreach($company->galleryPhotos as $photo)
                                <div class="col-12 col-lg-6 p-2">
                                    <div
                                        style="background-image: url({{ asset('storage/company_gallery/'.$company->id.'/'.$photo->number.'.'.$photo->extension) }});"
                                        class="photo embed-responsive embed-responsive-1by1 d-flex align-items-center justify-content-center">
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fotos Area End -->

    </div>
    </div>

    @include('components.footer')
    @include('components.scrollup')
@endsection
