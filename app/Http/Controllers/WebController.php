<?php

namespace App\Http\Controllers;
use App\Models\Category;
use App\Models\Company;
use App\Models\PaymentMethod;
use Illuminate\Http\Request;

class WebController extends Controller
{
    public function home(){
        $groups = Category::select(['id', 'name'])->where('category_id', null)->get();
        $categories = Category::select(['id', 'name'])
            ->whereNull('category_id')
            ->with(['categories' => function($q){ return $q->select(['id', 'name', 'category_id']); }])
            ->get()->toArray();

        $categories = array_map(function($category){
            return array(
                'name' => $category['name'],
                'categories' => array_map(function($subcategory) {
                    return array(
                       'id' => $subcategory['id'],
                       'name' =>  $subcategory['name']
                    );
                }, $category['categories'])
            );
        }, $categories);

        return view('home', [
            'groups' => $groups,
            'categories' => $categories
        ]);
    }

    public function aboutUs(){
        return view('aboutus');
    }

    public function viewCategory($id){

    }

    public function viewCompany($id){
        $company = Company::find($id)->with('category')->first();

        return view('view_company', [
            'company' => $company
        ]);
    }

    public function access(){
        $payments = PaymentMethod::select('name')->get();

        return view('access', [
            'paymentMethods' => $payments
        ]);
    }
}
