<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Route;

Route::get('/', [WebController::class, 'home'])->name('home');
Route::get('/categoria/{id}', [WebController::class, 'viewCategory'])->name('viewCategory');
Route::get('/empresa/{id}', [WebController::class, 'viewCompany'])->name('viewCompany');
Route::get('/aboutus', [WebController::class, 'aboutUs'])->name('aboutUs');
