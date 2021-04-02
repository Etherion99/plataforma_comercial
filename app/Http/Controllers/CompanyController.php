<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
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

    public function signup(Request $request){
        /*$files = $request->file('gallery');
        $texto = json_decode($request->input('texto'));
        $profilePhoto = $request->file('profile-photo');
        $new_var = $profilePhoto->getClientOriginalName() . '-';
//        foreach ($files as $file){
//            $new_var.= $file->getClientOriginalName();
//        }
        return $new_var;*/

        $logo = $request->file('logo');

        $companyData = json_decode($request->input('company_data'), true);
        $companyData['logo_ext'] = $logo->extension();
        $company = Company::create($companyData);

        $logo->storeAs('public/company_logo', $company->id.'.'.$logo->extension());


        $otherData = json_decode($request->input('other_data'), true);

        foreach ($otherData['schedules'] as $schedule){
            $schedule['company_id'] = $company->id;
            Schedule::create($schedule);
        }

        var_dump('dd');

    }
}
