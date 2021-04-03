<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PhoneType extends Model
{
    protected $fillable = ['name'];

    public function phones(){
        return $this->hasMany(Phone::class);
    }
}
