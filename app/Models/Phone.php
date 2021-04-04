<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Phone extends Model
{
    protected $fillable = ['number', 'phone_type_id', 'company_id'];

    public function company(){
        return $this->belongsTo(Company::class);
    }

    public function phoneType(){
        return $this->belongsTo(PhoneType::class);
    }
}
