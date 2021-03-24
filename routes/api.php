<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Route;

Route::get('categories/group/{id}', [CategoryController::class, 'getByFather'])->name('getCategoryByFather');


