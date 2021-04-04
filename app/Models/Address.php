<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = ['text', 'municipality_id', 'company_id'];

    public function municipality(){
        return $this->belongsTo(Municipality::class);
    }

    public function company(){
        return $this->belongsTo(Company::class);
    }
}
