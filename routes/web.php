<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Route;

Route::get('/', [WebController::class, 'home'])->name('home');

Route::get('/aboutus', [WebController::class, 'aboutUs'])->name('aboutUs');
