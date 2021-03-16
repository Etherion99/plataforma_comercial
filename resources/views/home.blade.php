@extends('layouts.main')

@section('title', 'prueba')

@section('styles')
    @parent

    <link rel="stylesheet" href="hola">
@endsection

@section('scripts')
    @parent

    <link rel="stylesheet" href="hola">
@endsection

@section('content')
    @include('components.header')
@endsection
