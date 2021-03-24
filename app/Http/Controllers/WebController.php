<?php

namespace App\Http\Controllers;
use App\Models\Category;
use Illuminate\Http\Request;

class WebController extends Controller
{
    public function home(){
        $groups = Category::select(['id', 'name'])->where('category_id', null)->get();

        return view('home', [
            'groups' => $groups
        ]);
    }
}
