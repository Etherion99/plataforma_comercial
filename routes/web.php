<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Route;

Route::get('/', [WebController::class, 'home'])->name('home');
Route::get('/categoria/{id}', [WebController::class, 'viewCategory'])->name('viewCategory');
