<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{


    public function companies(){
        return $this->hasMany(Company::class);
    }

    public function categories(){
        return $this->hasMany(Category::class, 'category_id');
    }

    public function allCategories(){
        return $this->hasMany(Category::class, 'category_id')->with('categories');
    }
}
