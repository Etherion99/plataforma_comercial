<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\Category;

class CompanyController extends Controller
{
    public function search($category, $text){
        if(count(explode(' ', $text)) > 1)
            $companies = Company::select('id', 'name', 'category_id')->whereRaw("MATCH(name) AGAINST('$text*' IN BOOLEAN MODE)");
        else
            $companies = Company::select('id', 'name', 'category_id')->where('name', 'LIKE', '%' . $text . '%');

        $categories = Category::select('id')->where('category_id', $category)->get()->toArray();
        $categories = array_map(fn($category) =>  $category['id'], $categories);

        if($category !== '0'){
            array_push($categories, $category);
            $companies = $companies->whereIn('category_id', $categories);
        }

        $companies = $companies->with(['category' => fn($q) => $q->select('id', 'name')])->limit(6)->get()->toArray();

        return $companies;
    }
}
