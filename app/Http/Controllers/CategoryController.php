<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function getByFather($id){
        return Category::select(['id', 'name'])->where('category_id', $id)->get();
    }
}
