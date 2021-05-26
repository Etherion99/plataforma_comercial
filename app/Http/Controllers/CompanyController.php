<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\GalleryPhoto;
use App\Models\Phone;
use App\Models\Schedule;
use App\Models\SocialLink;
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
        if($request->has('company_data')){
            $companyData = json_decode($request->input('company_data'), true);

            if($request->hasFile('logo')){
                $logo = $request->file('logo');

                $companyData['logo_ext'] = $logo->extension();
                $company = Company::create($companyData);

                $logo->storeAs('public/company_logo', $company->id.'.'.$logo->extension());
            }

            if($request->has('other_data')){
                $otherData = json_decode($request->input('other_data'), true);

                if(array_key_exists('schedules', $otherData)){
                    foreach ($otherData['schedules'] as $schedule){
                        $schedule['company_id'] = $company->id;
                        Schedule::create($schedule);
                    }
                }

                if(array_key_exists('payment_methods', $otherData)){
                    foreach ($otherData['payment_methods'] as $paymentmethod){
                        $company->paymentMethods()->attach($paymentmethod);
                    }
                }

                if(array_key_exists('phones', $otherData)){
                    foreach ($otherData['phones'] as $phone){
                        $phone['company_id'] = $company->id;
                        Phone::create($phone);
                    }
                }

                if(array_key_exists('addresses', $otherData)){
                    foreach ($otherData['addresses'] as $address){
                        $address['company_id'] = $company->id;
                        Address::create($address);
                    }
                }

                if(array_key_exists('social_networks', $otherData)){
                    foreach ($otherData['social_networks'] as $socialNetwork){
                        $socialNetwork['company_id'] = $company->id;
                        SocialLink::create($socialNetwork);
                    }
                }
            }
        }

        /*$gallery = $request->file('gallery');

        for ($i = 0; $i < count($gallery); $i++){
            $photo = $gallery[$i];

            $galleryPhoto = GalleryPhoto::create(array(
                'number' => $i,
                'company_id' => $company->id,
                'extension' => $photo->extension()
            ));

            $photo->storeAs('public/company_gallery/'.$company->id, $galleryPhoto->number.'.'.$photo->extension());
        }*/

        return true;
    }
}
