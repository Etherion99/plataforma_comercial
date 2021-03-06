<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'category_id', 'delivery', 'logo_ext', 'pack_id'
    ];

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function paymentMethods(){
        return $this->belongsToMany(PaymentMethod::class);
    }

    public function phones(){
        return $this->hasMany(Phone::class);
    }

    public function schedules(){
        return $this->hasMany(Schedule::class);
    }

    public function address(){
        return $this->hasOne(Address::class);
    }

    public function galleryPhotos(){
        return $this->hasMany(GalleryPhoto::class);
    }
}
