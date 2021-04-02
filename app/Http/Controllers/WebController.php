<?php

namespace App\Http\Controllers;
use App\Models\Category;
use App\Models\Company;
use App\Models\Department;
use App\Models\Pack;
use App\Models\PaymentMethod;
use Illuminate\Http\Request;

class WebController extends Controller
{
    public function home(){
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

        return view('home', [
            'categories' => $categories
        ]);
    }

    public function aboutUs(){
        return view('aboutus');
    }

    public function viewCategory($id){

    }

    public function viewCompany($id){
        $company = Company::where('id', $id)->with('category')->first();

        return view('view_company', [
            'company' => $company
        ]);
    }

    public function access(){
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

        $payments = PaymentMethod::select(['id', 'name'])->get();

        $departments = Department::select(['id', 'name'])
            ->with(['municipalities' => function($q){ return $q->select(['id', 'name', 'department_id']); }])
            ->get()->toArray();

        $departments = array_map(function($department){
            return array(
                'name' => $department['name'],
                'municipalities' => array_map(function($municipality) {
                    return array(
                        'id' => $municipality['id'],
                        'name' =>  $municipality['name']
                    );
                }, $department['municipalities'])
            );
        }, $departments);

        $packs = Pack::select(['id', 'name'])->get();

        return view('access', [
            'paymentMethods' => $payments,
            'categories' => $categories,
            'departments' => $departments,
            'packs' => $packs
        ]);
    }
}
