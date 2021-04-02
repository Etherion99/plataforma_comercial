<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function getByFather($id){
        return Category::select(['id', 'name'])->where('category_id', $id)->get();
    }

    public function getAll(){
        $categories = Category::select(['id', 'name'])
            ->whereNull('category_id')
            ->with(['categories' => function($q){ return $q->select(['id', 'name', 'category_id']); }])
            ->get()->toArray();

        $categories = array_map(function($category){
            return array(
                'id' => $category['id'],
                'name' => $category['name'],
                'categories' => array_map(function($subcategory) {
                    return array(
                        'id' => $subcategory['id'],
                        'name' =>  $subcategory['name']
                    );
                }, $category['categories'])
            );
        }, $categories);

        return $categories;
    }
}
