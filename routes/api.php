<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Route;

Route::get('categories/group/{id}', [CategoryController::class, 'getByFather'])->name('getCategoryByFather');
Route::get('/companies/{category}/search/{text}', [CompanyController::class, 'search'])->name('searchCompany');


