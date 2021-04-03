<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Phone;
use App\Models\Schedule;
use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\Category;

class CompanyController extends Controller
{
    public function search($category, $text){
        if(count(explode(' ', $text)) > 1)
            $companies = Company::select('id', 'name', 'category_id')->whereRaw("MATCH(name, description) AGAINST('$text*' IN BOOLEAN MODE)");
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
        /*
        $texto = json_decode($request->input('texto'));
        $profilePhoto = $request->file('profile-photo');
        $new_var = $profilePhoto->getClientOriginalName() . '-';
//        foreach ($files as $file){
//            $new_var.= $file->getClientOriginalName();
//        }*/


        //$logo = $request->file('logo');

        $companyData = json_decode($request->input('company_data'), true);
        $companyData['logo_ext'] = 'jpg'; //$logo->extension();
        $company = Company::create($companyData);

        //$logo->storeAs('public/company_logo', $company->id.'.'.$logo->extension());


        $otherData = json_decode($request->input('other_data'), true);

        foreach ($otherData['schedules'] as $schedule){
            $schedule['company_id'] = $company->id;
            Schedule::create($schedule);
        }

        foreach ($otherData['payment_methods'] as $paymentmethod){
            $company->paymentMethods()->attach($paymentmethod);
        }

        foreach ($otherData['phones'] as $phone){
            $phone['company_id'] = $company->id;
            Phone::create($phone);
        }

        foreach ($otherData['addresses'] as $address){
            $address['company_id'] = $company->id;
            Address::create($address);
        }

        $gallery = $request->file('gallery[]');

        foreach ($gallery as $photo){
            $photo->storeAs('public/company_gallery/'.$company->id, $company->id.'.'.$photo->extension());
        }

        var_dump('ll');

    }
}
